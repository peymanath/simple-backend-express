const mongo = require('mongoose');
const mongoTimestamp = require('mongoose-timestamp');

module.exports = mongo.model(
    'User',
    new mongo.Schema({
        email: { type: String, required: true, unique: [true, 'email must be unique'] },
        name: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    }).plugin(mongoTimestamp)
);
