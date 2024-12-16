import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the Customer model
export interface CustomerAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  token?: string;
  profile?: string;
  status?: boolean;
}

// Optional fields for model creation (e.g., ID might be auto-generated)
type CustomerCreationAttributes = Optional<CustomerAttributes, 'id' | 'token' | 'profile' | 'status'>;

// Define the Customer model class
class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public mobile!: string;
  public password!: string;
  public token?: string;
  public profile?: string;
  public status?: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
    // Example: Customer.hasMany(models.Orders, { foreignKey: 'customerId', as: 'orders' });
  }

  static initModel(sequelize: Sequelize): typeof Customer {
    Customer.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [2, 50], 
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [2, 50],
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true, 
          },
        },
        mobile: {
          type: DataTypes.STRING,
          allowNull: false,
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
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        timestamps: true, 
      }
    );
    return Customer;
  }
}

export default Customer;
