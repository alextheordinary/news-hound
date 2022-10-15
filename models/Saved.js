const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Saved extends Model { }


Saved.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
              },
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'item',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'saved',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

module.exports = Saved;
