import express from 'express';
import morgan from 'morgan';
import config from 'config';
import {scans} from './routes/scans'
import bodyParser from 'body-parser';

import { syncTablesDb } from './services/SeqDbService';

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

app.use('', scans);

const port = config.get('server.port');
const server = app.listen(port);
server.on('listening', () => console.log(`server is listening on port: ${port}, process pid: ${process.pid}`));
syncTablesDb();