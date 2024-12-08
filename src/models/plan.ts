import { Model, DataTypes, Sequelize } from 'sequelize';

export interface PlanAttributes {
  id?: number; 
  image: string;
  description: string;
  price: number;
  credits: number;
  timeSlots: number[]; 
  type: string;
  status: boolean;
}

module.exports = (sequelize: Sequelize) => {
  class Plan extends Model<PlanAttributes> implements PlanAttributes {
    public id!: number;
    public image!: string;
    public description!: string;
    public price!: number;
    public credits!: number;
    public timeSlots!: number[];
    public type!: string;
    public status!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define associations here (e.g., Plan.hasMany(models.OtherModel))
    }
  }

  Plan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Sequelize-specific type for arrays
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Plan',
      tableName: 'Plans', // Optional: specify table name explicitly
      timestamps: true, // Enable createdAt and updatedAt
    }
  );

  return Plan;
};
