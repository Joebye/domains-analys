import { connectDb } from '../domain/Sequelize.mjs';
import ListAnalyzes from '../domain/models/ListAnalyzes.mjs';
import DomainScans from '../domain/models/ScanResults.mjs';
import moment from "moment";

export default class SeqDbService {

    async analyzeDomainAndAddToResScansSeqDbFunc(obj: any) {
        let resToDbAdded: any;
        try {
          resToDbAdded = await DomainScans.create({
          url: obj.whoIs.WhoisRecord.domainName,
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
          resultsVt: JSON.stringify(obj.virusTotal.data.attributes),
          resultsWi: JSON.stringify(obj.whoIs)
        })
        } catch (error: any) {
          if (error.code != 11000) {
            throw error
          } 
        }
        return resToDbAdded;
        }

        async getActualDataFromSeqDb (domain: string) {
            const res = await DomainScans.findAll({
                where: {url: domain}
            });
            const actRes = res[res.length-1]
            return actRes; 
        }

        async addToAnalizesList(domain: string) {
            const res = await ListAnalyzes.findOrCreate({where: {url: domain}});
            return res;
        }

        async getDomainFromAnalizesList(domain: string) {
            const res = await ListAnalyzes.findOne({where: {url: domain}});
            return res;
        }

        async updateAnalizesList(domain: string) {
            const updatedEntity = {status: 'completed', updated: moment().format('YYYY-MM-DD HH:mm:ss')}
            const res = await ListAnalyzes.update(updatedEntity, {where: {
                url: domain
        }})
            return res;
        }

        async getAllDomainsForNextAnalyzes() {
            const findAllCompleted = await ListAnalyzes.findAll({
            where: {status: 'completed'}});
            return findAllCompleted.map((it:any) => it.url);
                    
        }
 }

export async function syncTablesDb() {
    let connectionStatus = false;
    console.log("Start connection");
    
    const id = setInterval(async () => {
    connectionStatus = await connectDb();
    console.log('Interval connection status: ' + connectionStatus);
    
    if (connectionStatus){
        console.log('Start clear process interval id: ' + id);
    clearInterval(id);  
    }
    },7000)
   
 try {
     
await DomainScans.sync();
     console.log(`${DomainScans.getTableName()} was synchronized`);
 } catch (error) {
     console.error(`Unable to synchronize ${DomainScans.getTableName()}`, error);
 }
 
 try {
     await ListAnalyzes.sync();
     console.log(`${ListAnalyzes.getTableName()} was synchronized`);
 } catch (error) {
     console.error(`Unable to synchronize ${ListAnalyzes.getTableName()}`, error);
 }
 
 }