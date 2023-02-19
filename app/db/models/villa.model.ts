import { Model, Sequelize } from "sequelize";
import { Type } from "../../helpers/type-generator";
import { Database, DbModel } from "../types";

export interface Villa extends Model {
    id: number;
    name: string;
    price: number;
    guests: number;

    createdAt: Date;
    updatedAt: Date;
}

export default (sequelize: Sequelize) => {
    const Villa = <DbModel<Villa>>sequelize.define(
        "Villa",
        {
            id: Type.primaryKey(),
            name: Type.str(255, false),
            price: Type.int,
            guests: Type.int,
        },
        {
            timestamps: true,
            underscored: true,
            tableName: "villas",
            indexes: [
                {
                    unique: true,
                    fields: ["name"],
                },
            ],
        }
    );

    Villa.associate = (db: Database) => {
        db.Villa.belongsToMany(db.Roll_Payment, { through: "roll_payments", foreignKey: "id", as: "villa_id" });
    };

    return Villa;
};
