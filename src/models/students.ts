import { Model, DataTypes, Sequelize } from 'sequelize';

// Define an interface for the Students attributes
export interface StudentAttributes {
  [x: string]: any;
  id?: number;
  name: string;
  email: string;
  degree: string;
  age: number;
}

module.exports = (sequelize: Sequelize) => {
  class Students extends Model<StudentAttributes> implements StudentAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public degree!: string;
    public age!: number;

    // define associations here
    static associate(models: any) {
      // Define associations if needed
    }
  }

  Students.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: 'Students',
      timestamps: true, // Enable if you want createdAt and updatedAt fields
    }
  );

  return Students;
};
