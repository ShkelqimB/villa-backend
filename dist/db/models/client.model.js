"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_generator_1 = require("../../helpers/type-generator");
exports.default = (sequelize) => {
    const Client = sequelize.define('Client', {
        id: type_generator_1.Type.primaryKey(),
        full_name: type_generator_1.Type.str(255, false),
        phone: type_generator_1.Type.str(255, false),
        email: type_generator_1.Type.str(255, false),
        guests: type_generator_1.Type.int
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'clients',
        indexes: [{
                unique: true,
                fields: ['name']
            }]
    });
    Client.associate = (db) => {
        db.Client.belongsToMany(db.Roll_Payment, { through: 'roll_payments', foreignKey: 'id', as: 'client_id' });
        // db.Client.hasMany(db.Permission, { foreignKey: 'appId', as: 'permissions' });
    };
    return Client;
};
