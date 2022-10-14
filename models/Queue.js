const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Queue extends Model { }

Queue.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'queue',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

module.exports = Queue;