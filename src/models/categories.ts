import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the Categories model
export interface CategoriesAttributes {
  id: number;
  name: string;
  createdById: number;
  createdByName: string;
  status: boolean;
}

// Optional fields for model creation
type CategoriesCreationAttributes = Optional<CategoriesAttributes, 'id'>;

// Define the Categories model class
class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> implements CategoriesAttributes {
  public id!: number;
  public name!: string;
  public createdById!: number;
  public createdByName!: string;
  public status!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    // Categories.hasMany(models.SomeOtherModel, { foreignKey: 'categoryId', as: 'relatedModels' });
  }

  static initModel(sequelize: Sequelize): typeof Categories {
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
            len: [2, 255], // Length validation: name must be between 2 and 255 characters
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
          defaultValue: false,
          allowNull: false
        },
      },
      {
        sequelize,
        modelName: 'Categories',
        tableName: 'categories',
        timestamps: true, // Include createdAt and updatedAt
      }
    );
    return Categories;
  }
}

export default Categories;
