import DomainScans from '../domain/models/ScanResults';
import moment from "moment";


export default class SeqDbService {

    async addToSeqDbFunc(obj: any) {
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

}