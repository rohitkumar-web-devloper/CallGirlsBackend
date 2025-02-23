import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the Service model
export interface ServiceAttributes {
  id?: number;
  name: string;
  adId: number
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type ServiceCreationAttributes = Optional<ServiceAttributes, 'id'>;

// Define the Service model class
class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public adId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    //  Service.hasMany(models.OtherModel, { foreignKey: 'serviceId', as: 'relatedItems' });
  }

  static initModel(sequelize: Sequelize): typeof Service {
    Service.init(
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
        modelName: 'Service',
        timestamps: true, // Enable createdAt and updatedAt
      }
    );
    return Service;
  }
}

export default Service;
