import type { Knex } from "knex";
import { configuration } from "../config/config";

const config: Knex.Config = {
  client: "mysql",
  connection: configuration.connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

module.exports = config;
//knex cli doesn't support es6 module system by default
