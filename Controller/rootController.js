const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const router = express.Router()
const { authorsQuery, authorsMutation } = require('./authorsController')
const { moviesQuery, moviesMutation } = require('./moviesController')
const { actorsQuery, actorsMutation } = require('./actorsController')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} = require('graphql')

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({ ...authorsQuery, ...moviesQuery, ...actorsQuery })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({ ...authorsMutation, ...moviesMutation, ...actorsMutation })
})

const moviesSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

router.use('/graphql', expressGraphQL({
    schema: moviesSchema,
}))

router.use('/graphiql', expressGraphQL({
    graphiql: true,
    schema: moviesSchema
}))


module.exports = router
