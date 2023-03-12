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
  const { JAWSDB_URL = '', MYSQL_USER = '', MYSQL_PASSWORD = '', MYSQL_HOST = '', MYSQL_DATABASE = '' } = process.env;
  console.log("🚀 ~ file: init.ts:24 ~ JAWSDB_URL:", JAWSDB_URL)
  console.log("🚀 ~ file: init.ts:24 ~ MYSQL_DATABASE:", MYSQL_DATABASE)
  console.log("🚀 ~ file: init.ts:24 ~ MYSQL_HOST:", MYSQL_HOST)
  console.log("🚀 ~ file: init.ts:24 ~ MYSQL_PASSWORD:", MYSQL_PASSWORD)
  console.log("🚀 ~ file: init.ts:24 ~ MYSQL_USER:", MYSQL_USER)

  let sequelize = new Sequelize(JAWSDB_URL);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });



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
