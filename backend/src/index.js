import { GraphQLServer } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Project from './resolvers/Project'

require("./config")

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Project
  }
})

server.start({ port: process.env.PORT | 8000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 8000}!`)
})
