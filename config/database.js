'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'mongodb'),

  /*
  |--------------------------------------------------------------------------
  | mongodb
  |--------------------------------------------------------------------------
  |
  */
  mongodb: {
    client: 'mongodb',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', 27017),
      user: Env.get('DB_USER', 'admin'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis'),
      auth: {
        source: Env.get('DB_AUTH_SOURCE', ''),
        mechanism: Env.get('DB_AUTH_MECHANISM', '')
      }
    }
  }
}
