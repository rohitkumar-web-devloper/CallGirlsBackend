import { Model, DataTypes, Sequelize } from 'sequelize';

export interface UserAttributes {
  [x: string]: any;
  id?: number;
  name: string;
  email: string;
  password: string;
  token:string
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public token!:string

  static associate(models: any) {
    // Define associations here
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      token:{
        type:DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
