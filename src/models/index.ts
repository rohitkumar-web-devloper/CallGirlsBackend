import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';
import process from 'process';

// Define the interface for models with associations
interface ModelWithAssociations extends ModelStatic<Model<any, any>> {
    associate?: (models: { [key: string]: ModelWithAssociations }) => void;
}

// Define the db object with proper typing
const db: { [key: string]: ModelWithAssociations } = {};

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '/../config/config.json');

// Load the Sequelize config
let config: any;
try {
    config = require(configPath)[env];
} catch (error: any) {
    console.error(`Error loading config: ${error.message}`);
    process.exit(1);
}

// Initialize Sequelize
let sequelize: Sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
    sequelize = new Sequelize(
        config.database as string,
        config.username as string,
        config.password as string,
        {
            host: config.host,
            dialect: config.dialect, // Ensure the dialect is provided
            logging: console.log, // Optional: add logging for debugging
        }
    );
}

// Import and initialize all models
const modelFiles = fs.readdirSync(__dirname).filter((file: string) => {
    return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        (file.slice(-3) === '.js' || file.slice(-3) === '.ts') &&
        file.indexOf('.test.js') === -1 &&
        file.indexOf('.test.ts') === -1
    );
});

(async () => {
    for (const file of modelFiles) {
        const modelModule = await import(path.join(__dirname, file));
        if (modelModule.default && typeof modelModule.default.initModel === 'function') {
            const model = modelModule.default.initModel(sequelize); // Initialize the model
            db[model.name] = model as ModelWithAssociations;
        }
    }

    // Setup associations after all models are initialized
    Object.keys(db).forEach((modelName) => {
        const model = db[modelName];
        if (model.associate) {
            model.associate(db);
        }
    });
})();

// Export the db and sequelize instances
export { sequelize, Sequelize };
export default db;
