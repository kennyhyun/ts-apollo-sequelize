import { BuildOptions, INTEGER, Model, STRING, UUID, UUIDV4 } from 'sequelize';

import sequelize from '../db';

class StepItem extends Model {
  public id: string;
  public type: string;
  public text: string;
  public url: string;
  public sequence: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export type StepItemInstance = StepItem;

StepItem.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: STRING,
    text: STRING,
    url: STRING,
    sequence: INTEGER,
  },
  {
    sequelize,
    modelName: 'stepItem',
    timestamps: true,
    paranoid: true,
  },
);

export type StepItemModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): StepItem;
}

export default StepItem as StepItemModelStatic;
