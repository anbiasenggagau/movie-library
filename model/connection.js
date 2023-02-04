const { Sequelize } = require('sequelize')
const { POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_USER } = require('../config/config')

// console.log(

const postgres = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
    // host: POSTGRES_HOST,
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = postgres