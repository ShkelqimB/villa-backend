import { Model, Sequelize } from 'sequelize';
import { Type } from '../../helpers/type-generator';
import { Database, DbModel } from '../types';
import { Client } from './client.model';
import { Villa } from './villa.model';

export interface Roll_Payment extends Model {
    id: number;
    amount: string;
    guests: Date;
    checkin: string;
    checkout: string;

    createdAt: Date;
    updatedAt: Date;

    readonly client: Client[];
    readonly villa: Villa[];
}

export default (sequelize: Sequelize) => {
    const Roll_Payment = <DbModel<Roll_Payment>>sequelize.define('Roll_Payment', {
        id: Type.primaryKey(),
        full_name: Type.str(255, false),
        amount: Type.int,
        guests: Type.DATE,
        checkin: Type.DATE,
        checkout: Type.DATE
    },
        {
            timestamps: true,
            underscored: true,
            tableName: 'roll_payments',
            indexes: [{
                unique: true,
                fields: ['name']
            }]
        });

    Roll_Payment.associate = (db: Database) => {
        // db.Roll_Payment.belongsToMany(db.RoleTemplate,
        //     { through: 'role_template_applications', foreignKey: 'applicationId', as: 'roleTemplates' });

        // db.Roll_Payment.hasMany(db.Permission, { foreignKey: 'appId', as: 'permissions' });
    }

    return Roll_Payment;
}