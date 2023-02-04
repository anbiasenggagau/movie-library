const { Author } = require('../model/Authors')
const { Movie } = require('../model/Movies')
const { MovieType } = require('./moviesController')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} = require('graphql')

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'List of authors of movies in the library',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        author: { type: GraphQLNonNull(GraphQLString) },
        total_gross: { type: GraphQLNonNull(GraphQLFloat) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: async (author) => {
                return await Movie.findAll({
                    where: {
                        author_id: author.id
                    }
                })
            }
        }
    })
})

const authorsQuery = {
    authors: {
        type: new GraphQLList(AuthorType),
        description: 'List of authors of movies in the library',
        resolve: async () => await Author.findAll()
    },
    author: {
        type: AuthorType,
        description: 'A single spesific author',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (parent, args) => await Author.findByPk(args.id)
    }

}

const authorsMutation = {
    addAuthor: {
        type: AuthorType,
        description: 'Add an author',
        args: {
            author: { type: GraphQLNonNull(GraphQLString) },
            total_gross: { type: GraphQLNonNull(GraphQLFloat) },
        },
        resolve: async (parent, args) => {
            const author = {
                author: args.author,
                total_gross: args.total_gross,
            }
            const newAuthor = await Author.create(author)
            return newAuthor
        }
    },
    deleteAuthor: {
        type: GraphQLString,
        description: 'Delete an author',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (parent, args) => {
            const result = await Author.destroy({ where: { id: args.id } })
            if (result > 0) return 'Success delete an author'
            else return 'Cannot find the author'
        }
    },
    updateAuthor: {
        type: AuthorType,
        description: 'Edit an author',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) },
            author: { type: GraphQLString },
            total_gross: { type: GraphQLFloat },
        },
        resolve: async (parent, args) => {
            const author = {
                author: args.author || undefined,
                total_gross: args.total_gross || undefined,
            }

            const result = await Author.update(author, {
                where: { id: args.id }
            })

            if (result > 0) return await Author.findByPk(args.id)
            else return {
                id: -1,
                author: 'Cannot find the author',
                total_gross: -1
            }
        }
    }
}

module.exports = { authorsQuery, authorsMutation, AuthorType }