import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the User model
export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  mobile: string
  password: string;
  token: string;
  profile: string
  status: Boolean
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public mobile!: string;
  public password!: string;
  public token!: string;
  public profile!: string
  public status!: boolean

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    // Example: User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  }

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
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
            len: [2, 100], // Name length validation
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // Ensure email is unique
          validate: {
            isEmail: true, // Validate email format
          },
        },
        mobile: {
          type: DataTypes.STRING,
          allowNull:false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true, 
        },
        profile: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
      },
      {
        sequelize,
        modelName: 'User',
        timestamps: true, // Enable createdAt and updatedAt
      }
    );
    return User;
  }
}

export default User;
