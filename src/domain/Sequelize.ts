import { Sequelize } from 'sequelize';
import config from 'config';

const userName = config.get('seqDbConfig.username') as string;
const password = config.get('seqDbConfig.password') as string;
const host = config.get('seqDbConfig.host') as string;
const port = config.get('seqDbConfig.port') as number;
const dialect = config.get('seqDbConfig.dialect') as any;
const isTimestamps = config.get('seqDbConfig.timestamps') as boolean

const schemaDb: string = config.get('seqDbSchemasCollections.schemaProj');

export class SequelizeDb {
    clientDb;
    schemaDb;
    //collectionString: string;
    constructor() {
        this.schemaDb = schemaDb;
      //  this.collectionString = schemaDb;
        this.clientDb = new Sequelize(schemaDb, userName, password, {
            host: host,
            port: port,
            dialect: dialect,
            define: {timestamps: isTimestamps}
    })
 }
    async connect() {
        try {
                await this.clientDb.authenticate();
                console.log(`Connection to db: "${this.schemaDb}" has been established successfully`);
               } catch (error) {
                 console.error(`Unable to connect to the db "${this.schemaDb}"`, error);
               }
               try {
                await this.clientDb.sync();
                console.log(`The db: "${this.schemaDb}" was synchronized`);
            } catch (error) {
                console.error(`Unable to synchronize the db: "${this.schemaDb}"`, error);
            }
        
    }
}
