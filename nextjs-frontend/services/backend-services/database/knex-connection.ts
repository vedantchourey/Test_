import backendConfig from '../../../utils/config/backend-config';

const {databaseName, dbUser, dbPort, dbHost, dbPassword} = backendConfig;

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: databaseName
  }
});


export default knex;
