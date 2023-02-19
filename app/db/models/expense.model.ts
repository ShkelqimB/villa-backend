import { Model, Sequelize } from 'sequelize';
import { Type } from '../../helpers/type-generator';
import { Database, DbModel } from '../types';

export interface Expense extends Model {
    id: number;
    name: string;
    description: string;
    date: Date;
    total: number;

    createdAt: Date;
    updatedAt: Date;
}

export default (sequelize: Sequelize) => {
    const Expense = <DbModel<Expense>>sequelize.define('Expense', {
        id: Type.primaryKey(),
        name: Type.str(255, false),
        description: Type.str(255, false),
        date: Type.DATE,
        total: Type.int,
    },
        {
            timestamps: true,
            underscored: true,
            tableName: 'expenses',
            indexes: [{
                unique: true,
                fields: ['name']
            }]
        });

    return Expense;
}