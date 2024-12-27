import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the AttentionTo model
export interface AttentionToAttributes {
  id?: number;
  name: string;
  adId: number;
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type AttentionToCreationAttributes = Optional<AttentionToAttributes, 'id'>;

// Define the AttentionTo model class
class AttentionTo
  extends Model<AttentionToAttributes, AttentionToCreationAttributes>
  implements AttentionToAttributes
{
  public id!: number;
  public name!: string;
  public adId!: number;


  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    // Example: AttentionTo.hasMany(models.OtherModel, { foreignKey: 'attentionToId', as: 'relatedItems' });
  }

  static initModel(sequelize: Sequelize): typeof AttentionTo {
    AttentionTo.init(
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
            len: [2, 50], // First name length validation
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
        modelName: 'AttentionTo',
        tableName: 'attentionTos', // Explicitly define table name
        timestamps: true, // Enable createdAt and updatedAt
      }
    );
    return AttentionTo;
  }
}

export default AttentionTo;
