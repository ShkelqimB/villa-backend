import { Model, Sequelize } from 'sequelize';
import { Type } from '../../helpers/type-generator';
import { Database, DbModel } from '../types';
import { Client } from './client.model';
import { Villa } from './villa.model';

export interface Roll_Payment extends Model {
    id: number;
    amount: number;
    guests: number;
    checkin: string;
    checkout: string;
    no_prepayment: boolean;
    deposit: boolean;
    full_prepayment: boolean;

    createdAt: Date;
    updatedAt: Date;

    readonly client: Client;
    readonly villa: Villa;
}

export default (sequelize: Sequelize) => {
    const Roll_Payment = <DbModel<Roll_Payment>>sequelize.define('Roll_Payment', {
        id: Type.primaryKey(),
        amount: Type.int,
        guests: Type.int,
        checkin: Type.DATE,
        checkout: Type.DATE,
        no_prepayment: Type.bool(),
        deposit: Type.bool(),
        full_prepayment: Type.bool(),
        client_id: Type.refId(),
        villa_id: Type.refId(),
    },
        {
            timestamps: true,
            underscored: true,
            tableName: 'roll_payments',
            indexes: [{
                unique: true,
                fields: ['id']
            }]
        });

    Roll_Payment.associate = (db: Database) => {
        db.Roll_Payment.belongsTo(db.Client, { targetKey: 'id', foreignKey: 'client_id', as: 'client' })
        db.Roll_Payment.belongsTo(db.Villa, { targetKey: 'id', foreignKey: 'villa_id', as: 'villa' })
        // db.Roll_Payment.belongsToMany(db.RoleTemplate,
        //     { through: 'role_template_applications', foreignKey: 'applicationId', as: 'roleTemplates' });

        // db.Roll_Payment.hasMany(db.Permission, { foreignKey: 'appId', as: 'permissions' });
    }

    return Roll_Payment;
}