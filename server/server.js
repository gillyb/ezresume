const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const publicRootDir = path.join(__dirname, '../public');
const publicBuildDir = path.join(__dirname, '../build');

const env = require('./config/env.js');
const logger = require('./logger');     // TODO: check how we integrate this into expressjs logger
const config = require('./config/config-loader');

app.disable('x-powered-by');

app.set('env', env);
app.set('view engine', 'pug');
app.set('views', publicRootDir + '/views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// static libraries
app.use(express.static(publicRootDir + '/scripts'));
app.use(express.static(publicRootDir + '/css'));
app.use(express.static(publicRootDir + '/img'));
app.use(express.static(publicRootDir + '/js'));
// for webpack output
app.use(express.static(publicBuildDir));


// auth
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
    resave: false,
    saveUninitialized: false,
    path: '/',
    httpOnly: true,
    secure: false,      // This is for https
    maxAge: null,
    name: config.auth.session.name,
    secret: config.auth.session.secret,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

require('./auth/anonymous')(app);
require('./auth/facebook')(app);
require('./auth/google')(app);
require('./auth/logout')(app);
require('./auth/session')(app);


// db
require('./db/setup');


// controllers
require('./controllers/main-controller.js')(app);
require('./controllers/resume-controller.js')(app);



// STOP! HAMMER TIME! //

logger.info(' :: Done initial loading.');
logger.info(' :: Starting server...');

// start listening...
const serverPort = Number(process.env.PORT || 5000);
app.listen(serverPort).on('error', function(ex) {

    logger.error(ex);

});