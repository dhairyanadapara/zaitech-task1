let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let trackSchema = mongoose.Schema({    
    name: { type: String, require: true },
    play_time: {type: String, require: true },
    album: { type: Schema.Types.ObjectId, ref:"Artist" , require: true },
});

module.exports = mongoose.model(`Track`, trackSchema, `tracks`);