const { Movie } = require('../model/Movies')
const { Actor } = require('../model/Actors')
const { ActorType } = require('./actorsController')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} = require('graphql')

const MovieType = new GraphQLObjectType({
    name: 'Movies',
    description: 'List of movies in the library',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        film: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        author_id: { type: GraphQLNonNull(GraphQLInt) },
        lead_studio: { type: GraphQLNonNull(GraphQLString) },
        audience_score: { type: GraphQLNonNull(GraphQLInt) },
        profitability: { type: GraphQLNonNull(GraphQLFloat) },
        rotten_tomatoes: { type: GraphQLNonNull(GraphQLInt) },
        worldwide_gross: { type: GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLNonNull(GraphQLInt) },
        actors: {
            type: new GraphQLList(ActorType),
            resolve: async (movie) => {
                return await Actor.findAll({
                    where: {
                        movie_id: movie.id
                    }
                })
            }
        }
    })
})

const moviesQuery = {
    movies: {
        type: new GraphQLList(MovieType),
        description: 'List of all movies in library',
        resolve: async () => await Movie.findAll()
    },
    movie: {
        type: MovieType,
        description: 'A single spesific movie',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (parent, args) => await Movie.findByPk(args.id)
    }
}

const moviesMutation = {
    addMovie: {
        type: MovieType,
        description: 'Add a movie',
        args: {
            film: { type: GraphQLNonNull(GraphQLString) },
            genre: { type: GraphQLNonNull(GraphQLString) },
            author_id: { type: GraphQLNonNull(GraphQLInt) },
            lead_studio: { type: GraphQLNonNull(GraphQLString) },
            audience_score: { type: GraphQLNonNull(GraphQLInt) },
            profitability: { type: GraphQLNonNull(GraphQLFloat) },
            rotten_tomatoes: { type: GraphQLNonNull(GraphQLInt) },
            worldwide_gross: { type: GraphQLNonNull(GraphQLString) },
            year: { type: GraphQLNonNull(GraphQLInt) },
        },
        resolve: async (parent, args) => {
            const movie = {
                film: args.film,
                genre: args.genre,
                author_id: args.author_id,
                lead_studio: args.lead_studio,
                audience_score: args.audience_score,
                profitability: args.profitability,
                rotten_tomatoes: args.rotten_tomatoes,
                worldwide_gross: args.worldwide_gross,
                year: args.year,
            }
            const newMovie = await Movie.create(movie)
            return newMovie
        }
    },
    deleteMovie: {
        type: GraphQLString,
        description: 'Delete a movie',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (parent, args) => {
            const result = await Movie.destroy({ where: { id: args.id } })
            if (result > 0) return 'Success delete a movie'
            else return 'Cannot find the movie'
        }
    },
    updateMovie: {
        type: MovieType,
        description: 'Edit a movie',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) },
            film: { type: GraphQLString },
            genre: { type: GraphQLString },
            author_id: { type: GraphQLInt },
            lead_studio: { type: GraphQLString },
            audience_score: { type: GraphQLInt },
            profitability: { type: GraphQLFloat },
            rotten_tomatoes: { type: GraphQLInt },
            worldwide_gross: { type: GraphQLString },
            year: { type: GraphQLInt },
        },
        resolve: async (parent, args) => {
            const movie = {
                film: args.film || undefined,
                genre: args.genre || undefined,
                author_id: args.author_id || undefined,
                lead_studio: args.lead_studio || undefined,
                audience_score: args.audience_score || undefined,
                profitability: args.profitability || undefined,
                rotten_tomatoes: args.rotten_tomatoes || undefined,
                worldwide_gross: args.worldwide_gross || undefined,
                year: args.year || undefined,
            }

            const result = await Movie.update(movie, {
                where: { id: args.id }
            })

            if (result > 0) return await Movie.findByPk(args.id)
            else return {
                id: -1,
                film: 'Cannot find the movie',
                genre: 'Cannot find the movie',
                lead_studio: 'Cannot find the movie',
                audience_score: -1,
                profitability: -1,
                rotten_tomatoes: -1,
                worldwide_gross: 'Cannot find the movie',
                year: -1,
            }
        }
    }
}

module.exports = { moviesQuery, moviesMutation, MovieType }