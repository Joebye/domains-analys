import express from 'express';
import morgan from 'morgan';
import config from 'config';
import {getAllDomainsForNextAnalyzes, scans} from './routes/scans'
import bodyParser from 'body-parser';
import cron from 'node-cron';
import { syncTablesDb } from './services/SeqDbService';
import { rabbitMqConsumeAndHandle } from './services/AnalysisQService';
import auth from './middleware/auth';

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(auth);
app.use('', scans);

const port = config.get('server.port');
const server = app.listen(port);
server.on('listening', () => console.log(`server is listening on port: ${port}, process pid: ${process.pid}`));

syncTablesDb();

const cronInterval = config.get('cronConfig.interval') as string;
cron.schedule(cronInterval, async() => {
    console.log('running scheduled analysis');
    getAllDomainsForNextAnalyzes();   
    await rabbitMqConsumeAndHandle();
   
})

