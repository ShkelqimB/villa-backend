import init from './init';
import { Database, DbModel } from './types';

const Database = {
  get empty(): Database {
    return {
      User: {} as DbModel,
      Client: {} as DbModel,
      Villa: {} as DbModel,
      Expense: {} as DbModel,
      Roll_Payment: {} as DbModel,
      sequelize: undefined as any,
      Sequelize: undefined as any,
    };
  }
};

export let db: Database = Database.empty;

export const initializeDatabase = () => {
  db = init();
}
