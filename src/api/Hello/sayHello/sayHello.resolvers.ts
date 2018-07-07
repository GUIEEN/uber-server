import { SayHelloQueryArgs, SayHelloResponse } from '../../../types/graph'

const resolvers = {
  Query: {
    sayHello: (parent, args: SayHelloQueryArgs, context): SayHelloResponse => {
      return {
        error: false,
        text: 'love you' + args.name
      }
    }
  }
}

export default resolvers
