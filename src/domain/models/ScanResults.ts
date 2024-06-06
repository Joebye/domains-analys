import config from 'config';
import { SequelizeDb } from '../Sequelize';
import { DataTypes } from 'sequelize';

const collectionScansDomains: string = config.get('seqDbSchemasCollections.collectionScans');
const sequelize = new SequelizeDb();

const DomainScans = sequelize.clientDb.define(collectionScansDomains, {
   
    url: {
        type: DataTypes.STRING,
        allowNull: false
        },
    timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
    resultsVt: {
            type: DataTypes.JSON,
            allowNull: false 
        },
    resultsWi: {
            type: DataTypes.JSON,
            allowNull: false
        }

})

connection();
async function connection() {
    await sequelize.connect();
    const scansRes = await DomainScans.findAll();
    console.log('data from the "ScanResults" table: ', scansRes.map(it => {
        return {
            'url': it.get('url'),
            'timestamp': it.get('timestamp'),
            }
    }));

}

export default DomainScans;
