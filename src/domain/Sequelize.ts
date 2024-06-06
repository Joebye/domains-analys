import { Sequelize } from 'sequelize';
import config from 'config';

const userName = config.get('seqDbConfig.username') as string;
const password = config.get('seqDbConfig.password') as string;
const host = config.get('seqDbConfig.host') as string;
const port = config.get('seqDbConfig.port') as number;
const dialect = config.get('seqDbConfig.dialect') as any;
const isTimestamps = config.get('seqDbConfig.timestamps') as boolean
const schemaDb = config.get('seqDbSchemasCollections.schemaProj') as string;

export const sequelize = new Sequelize(schemaDb, userName, password, {
                host: host,
                port: port,
                dialect: dialect,
                define: {timestamps: isTimestamps}
})


 export async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log(`Connection to db: ${schemaDb} has been established successfully`);
    } catch (error) {
        console.error(`Unable to connect to the db: ${schemaDb}`, error);
    }
}

  

