import VTService from "../services/VTService";
import express from 'express';
import asyncHandler from 'express-async-handler'
import WIService from "../services/WIService";
import SeqDbService from "../services/SeqDbService";
import valid from '../middleware/valid';
import validation from '../middleware/validation';
import Joi from 'joi';
import { rabbitMqSendToQ } from "../services/AnalysisQService";
const DOM_EXISTS_CHECK_LATER = "Requested domain already exists in the list of analyzes. Please, check results later";
const DOM_DNOT_EXIST_ADDED = "Requested domain analysis doesn't exist. It has been added to the analyzes list. Please, check results later";
const DOM_JUST_ADDED = "Your request has been added to the analyzes list. Thank you!"
export const scans = express.Router()
const vtService = new VTService();
const wiService = new WIService();
const seqDbService = new SeqDbService();

const schema = Joi.object({
    domain: Joi.string().domain().required()
})


scans.use(validation(schema));

scans.get('/scans', valid, asyncHandler(
    async(req,res) => {
        const resScanVT = await vtService.getScannedData(req.body.url);
        const domain: any = req.query.domainName;
        const resScanWI = await wiService.getUrlScan(domain);
        const [vt, wi] = await Promise.all([resScanVT, resScanWI]);
        const generalAnalysObj = {virusTotal: vt, whoIs: wi};
        await seqDbService.analyzeDomainAndAddToResScansSeqDbFunc(generalAnalysObj);
        res.send(generalAnalysObj)
    }))


    scans.get('/get/:domain', valid, asyncHandler(
        async (req, res) => {
        const domain = req.params.domain;
        const foundScan = await seqDbService.getActualDataFromSeqDb(domain);
        if (!foundScan) {
            const existDomain = await seqDbService.getDomainFromAnalizesList(domain);
            if(existDomain) {
                res.status(409).send({message: DOM_EXISTS_CHECK_LATER}) 
                return;
            }
            await seqDbService.addToAnalizesList(domain);
            await rabbitMqSendToQ(domain);  
            res.status(202).send({message: DOM_DNOT_EXIST_ADDED}) 
        } else {
            res.send(foundScan); 
        }}
    ))


    scans.get('/add/:domain', valid, asyncHandler(
        async (req, res) => {
            const domain = req.params.domain;
            const existDomain = await seqDbService.getDomainFromAnalizesList(domain);
            if (!existDomain) {
                await seqDbService.addToAnalizesList(domain);
                await rabbitMqSendToQ(domain);
                res.status(200).send({message: DOM_JUST_ADDED}) 
            } else {
                res.status(409).send({message: DOM_EXISTS_CHECK_LATER}) 
            }}
    ))




