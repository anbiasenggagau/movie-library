const { Movie } = require('../model/Movies')
const { Author } = require('../model/Authors')
const { Actor } = require('../model/Actors')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} = require('graphql')

const ActorType = new GraphQLObjectType({
    name: 'Actor',
    description: 'List of actors of the movies in the library',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        actor: { type: GraphQLNonNull(GraphQLString) },
        total_gross: { type: GraphQLNonNull(GraphQLFloat) },
        movie_id: { type: GraphQLNonNull(GraphQLInt) },
    })
})

const actorsQuery = {
    actors: {
        type: new GraphQLList(ActorType),
        description: 'List of actors of movies in the library',
        resolve: async () => await Actor.findAll()
    },
    actor: {
        type: ActorType,
        description: 'A single spesific actor',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (parent, args) => await Actor.findByPk(args.id)
    }
}

const actorsMutation = {
    addActor: {
        type: ActorType,
        description: 'Add an actor',
        args: {
            actor: { type: GraphQLNonNull(GraphQLString) },
            total_gross: { type: GraphQLNonNull(GraphQLFloat) },
            movie_id: { type: GraphQLNonNull(GraphQLInt) },
        },
        resolve: async (parent, args) => {
            const actor = {
                actor: args.actor,
                total_gross: args.total_gross,
                movie_id: args.movie_id,
            }
            const newActor = await Actor.create(actor)
            return newActor
        }
    },
    deleteActor: {
        type: GraphQLString,
        description: 'Delete an actor',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (parent, args) => {
            const result = await Actor.destroy({ where: { id: args.id } })
            if (result > 0) return 'Success delete an actor'
            else return 'Cannot find the actor'
        }
    },
    updateActor: {
        type: ActorType,
        description: 'Edit an actor',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) },
            actor: { type: GraphQLString },
            total_gross: { type: GraphQLFloat },
            movie_id: { type: GraphQLInt },
        },
        resolve: async (parent, args) => {
            const actor = {
                actor: args.actor || undefined,
                total_gross: args.total_gross || undefined,
                movie_id: args.movie_id || undefined,
            }

            const result = await Actor.update(actor, {
                where: { id: args.id }
            })

            if (result > 0) return await Actor.findByPk(args.id)
            else return {
                id: -1,
                actor: 'Cannot find the actor',
                total_gross: -1,
                movie_id: -1,
            }
        }
    }
}

module.exports = { actorsQuery, actorsMutation, ActorType }