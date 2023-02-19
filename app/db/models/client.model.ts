import { Model, Sequelize } from 'sequelize';
import { Type } from '../../helpers/type-generator';
import { Database, DbModel } from '../types';

export interface Client extends Model {
    id: number;
    full_name: string;
    email: string;
    phone: string;

    createdAt: Date;
    updatedAt: Date;
}

export default (sequelize: Sequelize) => {
    const Client = <DbModel<Client>>sequelize.define('Client', {
        id: Type.primaryKey(),
        full_name: Type.str(255, false),
        phone: Type.str(255, false),
        email: Type.str(255, false),
    },
        {
            timestamps: true,
            underscored: true,
            tableName: 'clients',
            indexes: [{
                unique: true,
                fields: ['name']
            }]
        });

    Client.associate = (db: Database) => {
        db.Client.belongsToMany(db.Roll_Payment,
            { through: 'roll_payments', foreignKey: 'id', as: 'client_id' });

        // db.Client.hasMany(db.Permission, { foreignKey: 'appId', as: 'permissions' });
    }

    return Client;
}