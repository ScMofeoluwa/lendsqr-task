import { knex } from "knex";
import { config } from "../database/knexfile";

export const db = knex(config);
