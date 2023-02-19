import { Sequelize } from 'sequelize';

import { Database } from './types'
import UserInit from './models/user.model';
import ClientInit from './models/client.model';
import ExpenseInit from './models/expense.model';
import VillaInit from './models/villa.model';
import RolePaymentInit from './models/roll_payment.model';

const associateDatabase = <T extends Database>(db: T) => {
  for (const modelKey in db) {
    if (db.hasOwnProperty(modelKey)) {
      const element = db[modelKey] as { associate?: (db: Database) => void };
      if (element.associate) {
        element.associate(db);
      }
    }
  }
  return db;
};

export default () => {
  const { MYSQL_URI = '' } = process.env;

  let sequelize = new Sequelize(MYSQL_URI);

  const db: Database = {
    Sequelize,
    sequelize,

    User: UserInit(sequelize),
    Villa: VillaInit(sequelize),
    Client: ClientInit(sequelize),
    Expense: ExpenseInit(sequelize),
    Roll_Payment: RolePaymentInit(sequelize),
  };

  return associateDatabase(db);
};
