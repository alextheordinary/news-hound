const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subscribed extends Model { }

Subscribed.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        feed_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'feeds',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'subscribed',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

module.exports = Subscribed;