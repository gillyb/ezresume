const Promise = require('bluebird');
const config = require('./../config/config-loader');

const mongoose = require('mongoose');

mongoose.connect(config.db.dbHost);
mongoose.Promise = Promise;

let dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'connection error: '));
dbConnection.once('open', function() {
    // TODO: use a better logger!
    console.log('Connected to mongodb @ localhost');
});
