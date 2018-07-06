import { Options } from 'graphql-yoga'
import app from './app'

const PORT: number | string = process.env.PORT || 4000
const PLAYGROUND_ENDPOINT: string = '/playground'
const GRAPHQL_ENDPOINT: string = '/graphql'

const appOptions: Options = {
  endpoint: GRAPHQL_ENDPOINT,
  playground: PLAYGROUND_ENDPOINT,
  port: PORT
}

const handleAppStart = () => console.log(`Listening on port ${PORT}`)

app.start(appOptions, handleAppStart)
