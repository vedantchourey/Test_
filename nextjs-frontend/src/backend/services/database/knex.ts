import backendConfig from '../../utils/config/backend-config';
import knexModule from 'knex';

const {databaseName, dbUser, dbPort, dbHost, dbPassword, ssl} = backendConfig.db;

export function createKnexConnection() {
  return knexModule({
    client: 'pg',
    connection: {
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: databaseName,
      ssl
    }
  });
}






