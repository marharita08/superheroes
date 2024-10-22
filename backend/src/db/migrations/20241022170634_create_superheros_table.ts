import type { Knex } from "knex";

const TABLE_NAME = "superheros";

const ColumnName = {
  ID: "id",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
  NICKNAME: "nickname",
  REAL_NAME: "real_name",
  ORIGIN_DESCRIPTION: "origin_description",
  CATCH_PHRASE: "catch_phrase",
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
    table.string(ColumnName.NICKNAME).notNullable();
    table.string(ColumnName.REAL_NAME).notNullable;
    table.text(ColumnName.ORIGIN_DESCRIPTION).notNullable;
    table.string(ColumnName.CATCH_PHRASE).notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
