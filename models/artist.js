let mongoose = require('mongoose');

let artistSchema = mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    years_active: { type: Number, require: true }
});

module.exports = mongoose.model(`Artist`, artistSchema, `artists`);