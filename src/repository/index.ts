import { knex } from "knex";
const config = require("../database/knexfile");

export const db = knex(config);
