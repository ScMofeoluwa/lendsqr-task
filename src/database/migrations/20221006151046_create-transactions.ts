import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.integer("amount").notNullable();
    table.integer("source").unsigned().references("wallets.id");
    table.integer("destination").unsigned().references("wallets.id");
    table.datetime("timestamp", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.enum("type", ["transfer", "deposit", "withdrawal"]).notNullable();
    table
      .enum("status", ["pending", "successful", "failed"])
      .defaultTo("pending");
    table
      .integer("wallet_id")
      .unsigned()
      .references("wallets.id")
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}
