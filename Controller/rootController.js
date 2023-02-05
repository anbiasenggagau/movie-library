const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const jwt = require('jsonwebtoken')
const router = express.Router()
const { authorsQuery, authorsMutation } = require('./authorsController')
const { moviesQuery, moviesMutation } = require('./moviesController')
const { actorsQuery, actorsMutation } = require('./actorsController')
const { ACCESS_TOKEN_SECRET } = require('../config/config')
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

router.use('/graphql', checkAuth, expressGraphQL({
    schema: moviesSchema,
}))

router.use('/graphiql', checkAuth, expressGraphQL({
    graphiql: true,
    schema: moviesSchema
}))

function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        console.log('Verified')
        next()
    })
}

module.exports = router
