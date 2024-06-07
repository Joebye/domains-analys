import config from 'config';
import { sequelize } from '../Sequelize';
import { DataTypes } from 'sequelize';

const collectionScansDomains: string = config.get('seqDbSchemasCollections.collectionScans');

const DomainScans = sequelize.define(collectionScansDomains, {
   
    url: {
        type: DataTypes.STRING,
        allowNull: false
        },
    timestamp: {
            type: DataTypes.STRING,
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


export default DomainScans;
