import { connectDb } from '../domain/Sequelize';
import ListAnalyzes from '../domain/models/ListAnalyzes';
import DomainScans from '../domain/models/ScanResults';
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

}


export async function syncTablesDb() {
    await connectDb();
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