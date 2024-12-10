import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the Plan model
export interface PlanAttributes {
  id?: number;
  name: string
  image?: string;
  description: string;
  price: number;
  credits: number;
  timeSlots: string;
  type: string;
  status: boolean;
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type PlanCreationAttributes = Optional<PlanAttributes, 'id'>;

// Define the Plan model class
class Plan extends Model<PlanAttributes, PlanCreationAttributes> implements PlanAttributes {
  public id!: number;
  public name!: string
  public image!: string;
  public description!: string;
  public price!: number;
  public credits!: number;
  public timeSlots!: string;
  public type!: string;
  public status!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here (e.g., Plan.hasMany(models.OtherModel))
  }

  // Static method to initialize the model
  static initModel(sequelize: Sequelize): typeof Plan {
    Plan.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,  // Image is optional
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        credits: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        timeSlots: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Plan',
        tableName: 'Plans',
        timestamps: true,
      }
    );
    return Plan;
  }
}

export default Plan;
