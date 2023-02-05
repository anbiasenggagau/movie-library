require('dotenv').config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost'
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'postgres'

module.exports = { ACCESS_TOKEN_SECRET, POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER }


