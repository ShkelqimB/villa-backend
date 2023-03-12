"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_generator_1 = require("../../helpers/type-generator");
exports.default = (sequelize) => {
    const Villa = sequelize.define("Villa", {
        id: type_generator_1.Type.primaryKey(),
        name: type_generator_1.Type.str(255, false),
        price: type_generator_1.Type.int,
        guests: type_generator_1.Type.int,
        image: type_generator_1.Type.str(255, true),
    }, {
        timestamps: true,
        underscored: true,
        tableName: "villas",
        indexes: [
            {
                unique: true,
                fields: ["name"],
            },
        ],
    });
    Villa.associate = (db) => {
        db.Villa.belongsToMany(db.Roll_Payment, { through: "roll_payments", foreignKey: "id", as: "villa_id" });
    };
    return Villa;
};
