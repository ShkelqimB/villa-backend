import { Sequelize, Model } from 'sequelize';

export type DbModel<M extends Model = any> = { new(): M } & typeof Model & {
    associate?: (db: Database) => void;
};

export interface Database {
    Sequelize: typeof Sequelize;
    sequelize: Sequelize;

    User: DbModel;
    Villa: DbModel;
    Client: DbModel;
    Expense: DbModel;
    Roll_Payment: DbModel;
}
