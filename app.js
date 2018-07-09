var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var hbs = require("express-handlebars");
var favicon = require("serve-favicon");
var app = express();
require('dotenv').config();
var routes = require("./routes/routes");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// setting port
app.set('port', process.env.PORT || 8080);

// setting view engine express-handlebars and it's extension and default layout
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'shortify', layoutsDir: __dirname + '/views'}));

// setting views directory
app.set('views', path.join(__dirname, 'views'));

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// Initilization view engine
app.set('view engine','hbs');

// setting static files directory
app.use(express.static(path.join(__dirname,"public")));

// routes
app.use('/', routes);

// app listening
app.listen(app.get('port'),function() {
    console.log("Server is running at " + app.get('port'));
});
