/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("todos").truncate();
  await knex("todos").insert([
    {
      message: "walk the doge",
    },
    {
      message: "update address",
    },
    {
      message: "wash car",
    },
  ]);
};
