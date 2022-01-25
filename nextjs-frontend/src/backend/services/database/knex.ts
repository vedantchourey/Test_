import backendConfig from '../../utils/config/backend-config';

const { databaseName, dbUser, dbPort, dbHost, dbPassword } = backendConfig.db;

const knexModule = require('knex');

export const knex = knexModule({
  client: 'pg',
  connection: {
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: databaseName
  }
});