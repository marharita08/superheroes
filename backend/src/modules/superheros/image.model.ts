import { Model, type RelationMappings } from "objection";

import { AbstractModel } from "../../db/abstract.model";
import { DBTables } from "../../db/db-tables.enum";
import { SuperheroModel } from "./superhero.model";

class ImageModel extends AbstractModel {
  public superheroId!: number;

  public link!: string;

  static get relationMappings(): RelationMappings {
		return {
      superheros: {
        join: {
          from: `${DBTables.IMAGES}.superheroId`,
          to: `${DBTables.SUPERHEROS}.id`
        },
        modelClass: SuperheroModel,
        relation: Model.BelongsToOneRelation,
      }
    }
  }

  public static override get tableName(): string {
		return DBTables.IMAGES;
	}
}

export { ImageModel };
