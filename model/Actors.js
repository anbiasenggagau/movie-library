const { DataTypes } = require('sequelize')
const postgres = require('./connection')

const Actor = postgres.define('Actor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    actor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_gross: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    movie_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Movies',
            key: 'id'
        }
    },
}, {
    timestamps: false
})


module.exports = { Actor }