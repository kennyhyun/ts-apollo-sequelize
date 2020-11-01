import { BuildOptions, FLOAT, Model, STRING, UUID, UUIDV4 } from 'sequelize';

import sequelize from '../db';

class Recipe extends Model {
  public id: string;
  public title: string;
  public ingredients: string;
  public seasoning: string;
  public servings: number;
  public processes: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Recipe.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: STRING,
    ingredients: STRING,
    seasoning: STRING,
    servings: FLOAT,
    processes: STRING,
    content: STRING,
  },
  {
    sequelize,
    modelName: 'recipe',
    timestamps: true,
    paranoid: true,
  },
);

export type RecipeModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Recipe;
}

export default Recipe as RecipeModelStatic;
