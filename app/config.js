import dotenv from 'dotenv';
import config from 'config';

dotenv.config();

const PORT = process.env.PORT || config.get('port');
const DB = {
    database: process.env.DATABASE_NAME || config.get('database.name'),
    username: process.env.DATABASE_USER || config.get('database.user'),
    password: process.env.DATABASE_PASS || config.get('database.password'),
    dialect: process.env.DATABASE_DIALECT || config.get('database.dialect'),
};
const JWT_SECRET = process.env.JWT_SECRET || config.get('jwt.secret');

export {
    PORT,
    DB,
    JWT_SECRET
}