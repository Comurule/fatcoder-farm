// Load all environmental variable
import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: 'root',
    password: null,
    database: 'fatcoder_farm',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'fatcoder_farm',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialect: 'postgres'
  },
};
