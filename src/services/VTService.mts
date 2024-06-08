import { fetchDataApi } from "../api/thirdPartyApi.mjs";
import config from "config";


export default class VTService {
  scanDomensUrl;
  getAnalysUrl;
  vtKey;
  constructor() {
    this.scanDomensUrl = config.get('vtApiConfig.scanDomensUrl') as string;
    this.getAnalysUrl = config.get('vtApiConfig.getAnalysis') as string;
    this.vtKey = config.get('vtApiConfig.vtApiKey') as string;
  }
    
  async getScannedData(searchParams: any) {
        const idDomen = await fetchDataApi(this.scanDomensUrl, undefined,
            {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'x-apikey': this.vtKey,
                  'content-type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({url: searchParams})
              }
         )
              return await this.getUrlScan(idDomen.data.id);
      }

    async getUrlScan(id: string) {
      const scanRes = await fetchDataApi(this.getAnalysUrl, id, 
        {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-apikey': this.vtKey
        }
      })
      return scanRes;
      }

      






  }

