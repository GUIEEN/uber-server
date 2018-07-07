import { ConnectionOptions } from 'typeorm'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  database: 'uber_server',
  entities: ['entities/**/*.*'],
  logging: true,
  synchronize: true,
  port: 5432,
  host: process.env.DB_ENDPOINT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}

export default connectionOptions
