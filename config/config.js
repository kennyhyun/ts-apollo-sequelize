/* eslint-disable */
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
/* eslint-enable */

const env = process.env.NODE_ENV;
const envKeyMap = {
  production: 'prod',
  stage: 'stg',
  development: 'dev',
  test: 'test',
};
const envPath = path.resolve(__dirname, `../dotenv/${envKeyMap[env] || ''}.env`);

dotenv.config({ path: envPath });

let config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTOR,
  define: {
    underscored: false,
  },
  retry: {
    max: 3,
    timeout: 3000,
    match: [
      Sequelize.ConnectionError,
      Sequelize.ConnectionRefusedError,
      Sequelize.ConnectionTimeoutError,
    ],
    backoffBase: 1000,
    backoffExponent: 1.5,
  },
};

if (process.env.NODE_ENV === 'production') {
  config = {
    ...config,
    dialectOptions: {
      ssl: {},
    },
    pool: { max: 5, min: 0, idle: 10000 },
  };
}

module.exports = config;
