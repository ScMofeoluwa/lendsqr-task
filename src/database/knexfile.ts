import type { Knex } from "knex";
import { configuration } from "../config/config";

const config: Knex.Config = {
  client: "mysql",
  connection: {
    database: configuration.database,
    user: configuration.username,
    password: configuration.password,
    host: configuration.host,
    port: configuration.port,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

// module.exports = config;
export { config };
