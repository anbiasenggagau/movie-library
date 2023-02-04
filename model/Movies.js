const { DataTypes } = require('sequelize')
const postgres = require('./connection')

const Movie = postgres.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    film: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Authors',
            key: 'id'
        }
    },
    lead_studio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    audience_score: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    profitability: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    rotten_tomatoes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    worldwide_gross: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
}, {
    timestamps: false
})


module.exports = { Movie }