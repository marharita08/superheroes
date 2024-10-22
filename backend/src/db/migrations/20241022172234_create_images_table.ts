import type { Knex } from "knex";

const TABLE_NAME = "images";

const ColumnName = {
  ID: "id",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
  SUPERHERO_ID: "superhero_id",
  LINK: "link",
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
    table.integer(ColumnName.SUPERHERO_ID).notNullable();
    table.string(ColumnName.LINK).notNullable;
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
