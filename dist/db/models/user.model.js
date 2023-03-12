"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_generator_1 = require("../../helpers/type-generator");
exports.default = (sequelize) => {
    const User = sequelize.define('User', {
        id: type_generator_1.Type.primaryKey(),
        full_name: type_generator_1.Type.str(255, false),
        age: type_generator_1.Type.int,
        phone: type_generator_1.Type.str(255, false),
        email: type_generator_1.Type.str(255, false),
        role: type_generator_1.Type.int,
        password: type_generator_1.Type.str(255, false)
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'users',
        indexes: [{
                unique: true,
                fields: ['id']
            }]
    });
    return User;
};
