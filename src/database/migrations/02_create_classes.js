exports.up = function (knex)
{
  return knex.schema.createTable("classes", (table) =>
  {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamp("created").notNullable();

    table
      .integer("module_id")
      .notNullable()
      .references("id")
      .inTable("modules")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex)
{
  return knex.schema.dropTable("classes");
};
