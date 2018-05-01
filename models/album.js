let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let albumSchema = mongoose.Schema({
    name: { type: String, require: true },
    release_date: { type: Date, require: true },
    artist: { type: Schema.Types.ObjectId, ref: "Artist", require: true }    
});

module.exports = mongoose.model(`Album`, albumSchema, `albums`);