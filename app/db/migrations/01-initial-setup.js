"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS clients(
        id        int(11) auto_increment primary key,
        full_name varchar(255) not null,
        email     varchar(255) not null,
        phone     varchar(255) not null,

        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS expenses(
      id          int(11) auto_increment primary key,
      name        varchar(255) not null,
      description varchar(255) not null,
      date        datetime     not null,
      total       int(11)          not null,

      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS users(
      id        int(11) auto_increment primary key,
      full_name varchar(255)  not null,
      age       int(11),
      phone     varchar(255)  not null,
      email     varchar(255)  not null,
      role      int(11)           not null,
      password  varchar(255)  not null,

      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
   `);

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS villas(
      id     int(11) auto_increment primary key,
      name   varchar(255)     not null,
      price  int(11)          not null,
      guests int(11)          not null,

      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS roll_payments(
      id        int(11) auto_increment primary key,
      amount    int(11)      null,
      guests    int(11)      null,
      checkin   datetime     null,
      checkout  datetime     null,
      client_id int(11)      null,
      villa_id  int(11)      null,

      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      constraint roll_payments_Client_id_fk
          foreign key (client_id) references clients(id),
      constraint roll_payments_villa_id_fk
          foreign key (villa_id) references villas(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("expenses");
    await queryInterface.dropTable("clients");
    await queryInterface.dropTable("villas");
    await queryInterface.dropTable("roll_payments");
  },
};
