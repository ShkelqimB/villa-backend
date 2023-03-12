"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_generator_1 = require("../../helpers/type-generator");
exports.default = (sequelize) => {
    const Roll_Payment = sequelize.define('Roll_Payment', {
        id: type_generator_1.Type.primaryKey(),
        amount: type_generator_1.Type.int,
        checkin: type_generator_1.Type.DATE,
        checkout: type_generator_1.Type.DATE,
        no_prepayment: type_generator_1.Type.bool(),
        deposit: type_generator_1.Type.bool(),
        full_prepayment: type_generator_1.Type.bool(),
        client_id: type_generator_1.Type.refId(),
        villa_id: type_generator_1.Type.refId(),
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'roll_payments',
        indexes: [{
                unique: true,
                fields: ['id']
            }]
    });
    Roll_Payment.associate = (db) => {
        db.Roll_Payment.belongsTo(db.Client, { targetKey: 'id', foreignKey: 'client_id', as: 'client' });
        db.Roll_Payment.belongsTo(db.Villa, { targetKey: 'id', foreignKey: 'villa_id', as: 'villa' });
        // db.Roll_Payment.belongsToMany(db.RoleTemplate,
        //     { through: 'role_template_applications', foreignKey: 'applicationId', as: 'roleTemplates' });
        // db.Roll_Payment.hasMany(db.Permission, { foreignKey: 'appId', as: 'permissions' });
    };
    return Roll_Payment;
};
