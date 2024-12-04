'use strict';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes of the model
export interface CategoriesAttributes {
  [x: string]: any;
  id: number; // Primary key (optional, depending on your setup)
  name: string;
  createdById: number;
  createdByName: string;
  status: boolean
}

// Define optional attributes for creation (e.g., ID might be auto-generated)
interface CategoriesCreationAttributes extends Optional<CategoriesAttributes, 'id'> { }

// Define the model class
class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes>
  implements CategoriesAttributes {
  public id!: number;
  public name!: string;
  public createdById!: number;
  public createdByName!: string;
  public status!: boolean

  // Timestamps (optional, add if your table includes these)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
  }
}

// Initialize the model
export default (sequelize: Sequelize): typeof Categories => {
  Categories.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 2
        },
      },
      createdById: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdByName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      sequelize,
      modelName: 'Categories',
      tableName: 'categories', // Specify table name if it differs
      timestamps: true, // Include createdAt and updatedAt
    }
  );

  return Categories;
};
