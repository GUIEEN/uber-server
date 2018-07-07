import cors from 'cors'
import { GraphQLServer } from 'graphql-yoga'
import helmet from 'helmet'
import logger from 'morgan'
import schema from './schema'

class App {
  public app: GraphQLServer
  constructor() {
    this.app = new GraphQLServer({
      schema
    })
    this.middlewares(this.app.express)
  }
  private middlewares = (express: GraphQLServer['express']): void => {
    express.use(cors())
    express.use(logger('dev'))
    express.use(helmet())
  }
}

export default new App().app
