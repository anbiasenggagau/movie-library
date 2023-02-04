const express = require('express')
const { Users } = require('./model/Users')
const { Movie } = require('./model/Movies')
const { Actor } = require('./model/Actors')
const { Author } = require('./model/Authors')
const postgres = require('./model/connection')
const { moviesInit } = require('./model/seeding/moviesSeeding')
const { actorsInit } = require('./model/seeding/actorsSeeding')
const { authorsInit } = require('./model/seeding/authorsSeeding')
const movieRouter = require('./Controller/rootController')

const app = express()
app.use(express.json())
connectDB(postgres)

app.use('/', movieRouter)

app.listen(3000, () => {
    console.log('Listen to port 3000')
}
)

async function connectDB(sequelize) {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ alter: true })

        await Users.findOrCreate({
            where: { name: 'Senggagau' },
            defaults: { name: 'Senggagau', username: 'anbiasenggagau' }
        })

        const authorsCount = await Author.findAndCountAll()
        if (authorsCount.count === 0) await postgres.query(authorsInit)

        const moviesCount = await Movie.findAndCountAll()
        if (moviesCount.count === 0) await postgres.query(moviesInit)

        const actorsCount = await Actor.findAndCountAll()
        if (actorsCount.count === 0) await postgres.query(actorsInit)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
