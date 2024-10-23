import { Model, type RelationMappings } from "objection";

import { AbstractModel } from "../../db/abstract.model";
import { DBTables } from "../../db/db-tables.enum";
import { ImageModel } from "./image.model";

class SuperheroModel extends AbstractModel {
  public nickname!: string;

  public realName!: string;

  public originDescription!: string;

  public superpowers!: string;

  public catchPhrase!: string;

  static get relationMappings(): RelationMappings {
		return {
      superheros: {
        join: {
          from: `${DBTables.SUPERHEROS}.id`,
          to: `${DBTables.IMAGES}.superheroId`
        },
        modelClass: ImageModel,
        relation: Model.HasManyRelation,
      }
    }
  }

  public static override get tableName(): string {
		return DBTables.SUPERHEROS;
	}
}

export { SuperheroModel };
