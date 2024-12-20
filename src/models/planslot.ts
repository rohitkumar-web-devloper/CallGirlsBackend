import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import TimeSlot from '../Graphql/Panel/TimeSlots/resolver';

// Define the attributes for the PlanSlot model
export interface PlanSlotAttributes {
  id?: number;
  planId: number;
  timeSlotId: number;
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type PlanSlotCreationAttributes = Optional<PlanSlotAttributes, 'id'>;

// Define the PlanSlot model class
class PlanSlot extends Model<PlanSlotAttributes, PlanSlotCreationAttributes>
  implements PlanSlotAttributes {
  public id!: number;
  public planId!: number;
  public timeSlotId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    PlanSlot.hasMany(models.TimeSlots, { foreignKey: 'id', as: 'slots' });
  }

  static initModel(sequelize: Sequelize): typeof PlanSlot {
    PlanSlot.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        planId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        timeSlotId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'PlanSlot',
        tableName: 'PlanSlots', // Explicitly define table name
        timestamps: true, // Enable createdAt and updatedAt
      }
    );
    return PlanSlot;
  }
}

export default PlanSlot;
