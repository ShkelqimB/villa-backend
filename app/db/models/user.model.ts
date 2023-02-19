import { Model, Sequelize } from 'sequelize';
import { Type } from '../../helpers/type-generator';
import { Database, DbModel } from '../types';

export interface User extends Model {
    id: number;
    full_name: string;
    age: number;
    phone: string;
    email: string;
    role: number;
    password: string;

    createdAt: Date;
    updatedAt: Date;
}

export default (sequelize: Sequelize) => {
    const User = <DbModel<User>>sequelize.define('User', {
        id: Type.primaryKey(),
        full_name: Type.str(255, false),
        age: Type.int,
        phone: Type.str(255, false),
        email: Type.str(255, false),
        role: Type.int,
        password: Type.str(255, false)
    },
        {
            timestamps: true,
            underscored: true,
            tableName: 'users',
            indexes: [{
                unique: true,
                fields: ['id']
            }]
        });

    return User;
}