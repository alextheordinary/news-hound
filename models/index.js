// models
const User = require('./User');
const Saved = require('./Saved');
const Item = require('./Item');
const Subscribed = require('./Subscribed');
const Feeds = require('./Feeds');

User.hasMany(Saved, {
    foreignKey: 'user_id'
});

User.hasMany(Item, {
    foreignKey: 'user_id'
});

User.hasMany(Subscribed, {
    foreignKey: 'user_id'
});

Saved.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Saved.belongsTo(Item, {
    foreignKey: 'item_id',
    onDelete: 'CASCADE'
});

Item.hasOne(Saved, {
    foreignKey: 'item_id'
});

Item.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Item.belongsTo(Feeds, {
    foreignKey: 'feed_id',
    onDelete: 'SET NULL'
});

Subscribed.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Subscribed.belongsTo(Feeds, {
    foreignKey: 'feed_id',
    onDelete: 'CASCADE'
});

Feeds.hasMany(Item, {
    foreignKey: 'feed_id'
});

Feeds.hasMany(Subscribed, {
    foreignKey: 'feed_id'
});

module.exports = {
    User,
    Saved,
    Item,
    Subscribed,
    Feeds,
};