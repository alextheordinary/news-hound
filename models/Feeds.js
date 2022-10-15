const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Feeds extends Model { }

Feeds.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        feed_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'feeds',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

module.exports = Feeds;