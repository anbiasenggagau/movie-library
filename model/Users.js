const { DataTypes } = require('sequelize')
const postgres = require('./connection')

const Users = postgres.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
})


module.exports = { Users }