const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model { }

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isURL: true
            }
        },
        headline: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        published_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        feed_id: {
        type: DataTypes.INTEGER,
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
        modelName: 'item',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
    );

    module.exports = Item;