import config from 'config';
import { sequelize } from '../Sequelize';
import { DataTypes } from 'sequelize';

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

    created_at: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

export default ListAnalyzes;
