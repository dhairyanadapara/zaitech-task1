var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    mongoose.connect('mongodb://127.0.0.1:27017/SongLogs');
} else if (env === 'test') {
    process.env.PORT = 3000;
    mongoose.connect('mongodb://127.0.0.1:27017/SongLogTest');
}

module.exports ={
    mongoose
};