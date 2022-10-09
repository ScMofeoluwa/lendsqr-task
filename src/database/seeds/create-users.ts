import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      username: "mofeoluwa",
      email: "mofeoluwa@gmail.com",
      password: "mofeoluwa",
    },
    { username: "victor", email: "victor@gmail.com", password: "victor" },
    { username: "tobiloba", email: "tobiloba@gmail.com", password: "tobiloba" },
  ]);
}
