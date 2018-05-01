let express = require('express');
let morgan = require('morgan');
let hbs = require('hbs');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let path = require('path');
let mongoose = require('./db/mongoose');

hbs.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
})

let app = express();

let mainRoute = require('./routes/mainRoute');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(mainRoute);

app.listen(3000, ()=>{
    console.log(`server is up`);
});

