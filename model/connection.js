const { Sequelize } = require('sequelize')
const { POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_USER } = require('../config/config')

const postgres = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    dialect: 'postgres',
    logging: false
})

module.exports = postgres