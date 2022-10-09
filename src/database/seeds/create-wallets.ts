import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("wallets").del();

  // Inserts seed entries
  await knex("wallets").insert([
    { user_id: 1 },
    { user_id: 2 },
    { user_id: 3 },
  ]);
}
