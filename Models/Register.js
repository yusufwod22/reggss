const { Schema, model} = require('mongoose')

const RegisterData = new Schema({
    Guild: String,
    User: String,
    Role: String,
    Date: Date,
    userNames: { type: Array, default: [] }
});

module.exports = model('Register', RegisterData);