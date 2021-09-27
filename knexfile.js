require('dotenv').config()

const pg = require('pg')
const db = process.env.POSTGRES_DATABASE

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migration: { directory: '.data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    pool: { min: 2, max: 10 },
    connection: {
      connectionString: process.env.DATABASE_URL || db,
      ssl: {rejectUnauthorized: false}
    }
  }, 
};
