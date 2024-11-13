import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';
import process from 'process';

// Extend ModelStatic to include associate method
interface ModelWithAssociations extends ModelStatic<Model<any, any>> {
    associate?: (models: { [key: string]: ModelWithAssociations }) => void;
}

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '/../config/config.json');

// Load the configuration
let config;
try {
    config = require(configPath)[env];
} catch (error: any) {
    console.error(`Error loading config: ${error.message}`);
    process.exit(1);
}

const db: { [key: string]: ModelWithAssociations } = {};
let sequelize: Sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
    // Include the dialect in the Sequelize constructor
    sequelize = new Sequelize(
        config.database as string,
        config.username as string,
        config.password as string,
        {
            host: config.host,
            dialect: config.dialect, // Ensure the dialect is provided
        }
    );
}

// Read all model files and initialize them
const modelFiles = fs.readdirSync(__dirname)
    .filter((file: string) => {
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
        // Use dynamic import
        const model = (await import(path.join(__dirname, file))).default(sequelize, DataTypes) as ModelWithAssociations;
        db[model.name] = model;
    }

    // Setup associations for each model
    Object.keys(db).forEach((modelName: string) => {
        const model = db[modelName];
        if (model.associate) {
            model.associate(db);
        }
    });
})();

// Export sequelize instance and models
export { sequelize, Sequelize };
export default db;
