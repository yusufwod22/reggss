const { Schema, model} = require('mongoose')

const StaffData = new Schema({
    Guild: String,
    Admin: String,
    Total: Number,
    Girl: Number,
    Boy: Number
});

module.exports = model('Staff', StaffData);