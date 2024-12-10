import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface TimeSlotsAttributes {
  id?: number;
  name: string;
  startTime: string;
  endTime: string;
  createdById: number;
  createdByName: string
  status: boolean
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type TimeSlotsCreationAttributes = Optional<TimeSlotsAttributes, 'id'>;

// Define the TimeSlots model class
class TimeSlots extends Model<TimeSlotsAttributes, TimeSlotsCreationAttributes> implements TimeSlotsAttributes {
  public id!: number;
  public name!: string;
  public startTime!: string;
  public endTime!: string;
  public createdById!: number;
  public createdByName!: string;
  public status!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations (if any)
  static associate(models: any) {
    // Example: TimeSlots.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }

  // Initialize the model
  static initModel(sequelize: Sequelize): typeof TimeSlots {
    TimeSlots.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            len: [2, 50],
          },
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdById: {
          type: DataTypes.INTEGER
        },
        createdByName: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN
        }
      },
      {
        sequelize,
        modelName: 'TimeSlots',
        tableName: 'timeslots',
        timestamps: true,
      }
    );
    return TimeSlots;
  }
}

export default TimeSlots;
