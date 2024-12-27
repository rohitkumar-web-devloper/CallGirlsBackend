import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the PlaceOfService model
export interface PlaceOfServiceAttributes {
  id?: number;
  name: string;
  adId:number
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type PlaceOfServiceCreationAttributes = Optional<PlaceOfServiceAttributes, 'id'>;

// Define the PlaceOfService model class
class PlaceOfService
  extends Model<PlaceOfServiceAttributes, PlaceOfServiceCreationAttributes>
  implements PlaceOfServiceAttributes
{
  public id!: number;
  public name!: string;
  public adId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    // Example: PlaceOfService.hasMany(models.OtherModel, { foreignKey: 'placeOfServiceId', as: 'relatedItems' });
  }

  static initModel(sequelize: Sequelize): typeof PlaceOfService {
    PlaceOfService.init(
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
            len: [2, 50], 
            notEmpty: { msg: 'name is required' },
          },
        },
        adId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'PlaceOfService',
        tableName: 'placeOfServices', // Explicitly define table name
        timestamps: true, // Enable createdAt and updatedAt
      }
    );
    return PlaceOfService;
  }
}

export default PlaceOfService;
