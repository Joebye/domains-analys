import config from 'config';
import moment from 'moment';
import { sequelize } from '../Sequelize.mjs';
import { DataTypes } from 'sequelize'

const collectionListAnalyzes: string = config.get('seqDbSchemasCollections.collectionListAnalyzes');

const ListAnalyzes = sequelize.define(collectionListAnalyzes, {
   
    url: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
        },
    status: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending'
    },

    added: {
        type: DataTypes.STRING,
        defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
        allowNull: false
    },
    updated: {
        type: DataTypes.STRING,
        allowNull: true
    }

})

export default ListAnalyzes;
