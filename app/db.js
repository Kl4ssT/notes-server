import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { DB } from './config';

const sequelize = new Sequelize(DB.database, DB.username, DB.password, { dialect: DB.dialect });

const modelsDir = path.resolve(__dirname, 'models');

const models = {};

fs
    .readdirSync(modelsDir)
    .filter((file) => (file.indexOf('.')  !== 0) && (file.indexOf('..') !== 0))
    .forEach((file) => {
        const model = sequelize.import(path.join(modelsDir, file));
        models[model.name] = model;
    });

Object.keys(models).forEach((model) => {
    if ('associate' in models[model]) {
        models[model].associate(models);
    }
});

export {
    sequelize,
    Sequelize
};

export default models;