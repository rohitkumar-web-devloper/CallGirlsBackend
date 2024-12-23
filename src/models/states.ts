import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the State model
export interface StateAttributes {
  id?: number;
  name: string;
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type StateCreationAttributes = Optional<StateAttributes, 'id'>;

// Define the State model class
class State extends Model<StateAttributes, StateCreationAttributes> implements StateAttributes {
  public id!: number;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    // Example: State.hasMany(models.City, { foreignKey: 'stateId', as: 'cities' });
  }

  static initModel(sequelize: Sequelize): typeof State {
    State.init(
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
            len: [2, 100], // State name length validation
          },
        },
      },
      {
        sequelize,
        modelName: 'State',
        tableName: 'states', // Explicitly define table name
        timestamps: true, // Enable createdAt and updatedAt
      }
    );

    return State;
  }
}

export default State;
