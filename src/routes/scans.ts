import VTService from "../services/VTService";
import express from 'express';
import asyncHandler from 'express-async-handler'
import WIService from "../services/WIService";
import SeqDbService from "../services/SeqDbService";
import valid from '../middleware/valid';
import validation from '../middleware/validation';
import Joi from 'joi';
export const scans = express.Router()
const vtService = new VTService();
const wiService = new WIService();
const seqDbservice = new SeqDbService();

const schema = Joi.object({
    domain: Joi.string().domain().required()
})


scans.use(validation(schema));

scans.get('/scans', asyncHandler(
    async(req,res) => {
        const resScanVT = await vtService.getScannedData(req.body.url);
        const domain: any = req.query.domainName;
        const resScanWI = await wiService.getUrlScan(domain);
        const [vt, wi] = await Promise.all([resScanVT, resScanWI]);
        const generalAnalysObj = {virusTotal: vt, whoIs: wi};
        await seqDbservice.addToSeqDbFunc(generalAnalysObj);
        res.send(generalAnalysObj)
    }))


    scans.get('/:domain', valid, asyncHandler(
        async (req, res) => {
        const domain = req.params.domain;
        const foundScan = await seqDbservice.getActualDataFromSeqDb(domain);
        if (!foundScan) {
            //TODO

          throw new Error("Requested result analys domain doesn't exist. It has been added to the analysis list. Please, check it later")
        } else {
            res.send(foundScan); 
        }}
    ))


