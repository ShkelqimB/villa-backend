"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_generator_1 = require("../../helpers/type-generator");
exports.default = (sequelize) => {
    const Expense = sequelize.define('Expense', {
        id: type_generator_1.Type.primaryKey(),
        name: type_generator_1.Type.str(255, false),
        description: type_generator_1.Type.str(255, false),
        date: type_generator_1.Type.DATE,
        total: type_generator_1.Type.int,
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'expenses',
        indexes: [{
                unique: true,
                fields: ['name']
            }]
    });
    return Expense;
};
