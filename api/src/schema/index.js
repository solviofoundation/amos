import {R} from 'common'
import {makeAugmentedSchema} from 'neo4j-graphql-js'
import applyDirectives from '../bootstrap/directives'
import applyScalars from '../bootstrap/scalars'
import typeDefs from './types'
import resolvers from './resolvers'
import CONFIG from '../config'

export default {
  typeDefs,
  resolvers,
  config: {
    debug: !!CONFIG.DEBUG,
    auth: {
      isAuthenticated: true,
      hasRole: true,
    },
    // query: true,
    // query: false,
    query: {
      exclude: [
        // `AmosGame`,
        `Response`,
        `Path`,
        // `autocomplete`,
      ],
    },
    // mutation: true,
    mutation: false,
    // mutation: {
    //   exclude: [
    //     `Topic`,
    //     // `AmosGame`,
    //     // `AmosGameVotes`,
    //     // `Response`,
    //     // `createTopic`,
    //   ],
    // },
  },
} |> makeAugmentedSchema
  |> applyDirectives
  |> applyScalars
