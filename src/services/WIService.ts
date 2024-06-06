import config from 'config';
import { fetchDataApi } from '../api/thirdPartyApi';

export default class WIService {
    url;
    key;
    outputFormat;
    constructor() {
    this.url = config.get('whoisApiConfig.baseUrl') as string;
    this.key = config.get('whoisApiConfig.whoisKey') as string;
    this.outputFormat = config.get('whoisApiConfig.outputFormat') as string;
    }

    async getUrlScan(domainName: string) {
    const searchParams = new URLSearchParams({apiKey: this.key, domainName: domainName, outputFormat: this.outputFormat});
    const scanRes = await fetchDataApi(this.url + searchParams)
    return scanRes;
    }
} 


