import dotenv from 'dotenv'
import { Options } from 'graphql-yoga'
import { createConnection } from 'typeorm'
import app from './app'
import connectionOptions from './ormConfig'

dotenv.config()

const PORT: number | string = process.env.PORT || 4000
const PLAYGROUND_ENDPOINT: string = '/playground'
const GRAPHQL_ENDPOINT: string = '/graphql'

const appOptions: Options = {
  endpoint: GRAPHQL_ENDPOINT,
  playground: PLAYGROUND_ENDPOINT,
  port: PORT
}

const handleAppStart = () => console.log(`Listening on port ${PORT}`)

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart)
  })
  .catch(error => console.log(error))
