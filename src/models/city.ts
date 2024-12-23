import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the Cities model
export interface CityAttributes {
  id?: number;
  name: string;
  stateId: number;
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type CityCreationAttributes = Optional<CityAttributes, 'id'>;

// Define the Cities model class
class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
  public id!: number;
  public name!: string;
  public stateId!: number;
 

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    // Example: City.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
  }

  static initModel(sequelize: Sequelize): typeof City {
    City.init(
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
            len: [2, 100], // City name length validation
          },
        },
        stateId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'states', // Reference the States table
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      {
        sequelize,
        modelName: 'City',
        tableName: 'cities', // Explicitly define table name
        timestamps: true, // Enable createdAt and updatedAt
      }
    );

    return City;
  }
}

export default City;
