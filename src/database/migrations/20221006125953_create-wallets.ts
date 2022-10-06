import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("wallets", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().unique().references("users.id");
    table.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("wallets");
}
