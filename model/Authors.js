const { DataTypes } = require('sequelize')
const postgres = require('./connection')

const Author = postgres.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_gross: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false
})


module.exports = { Author }