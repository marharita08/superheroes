import type { Knex } from "knex";

const TableName = {
  IMAGES: "images",
  SUPERHEROES: "superheroes"
};

const ColumnName = {
  ID: "id",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
  SUPERHERO_ID: "superhero_id",
  LINK: "link"
};

const DELETE_STRATEGY = "CASCADE";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.IMAGES, table => {
    table.increments(ColumnName.ID).primary();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .integer(ColumnName.SUPERHERO_ID)
      .notNullable()
      .references(ColumnName.ID)
      .inTable(TableName.SUPERHEROES)
      .onDelete(DELETE_STRATEGY);
    table.string(ColumnName.LINK).notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableName.IMAGES);
}
