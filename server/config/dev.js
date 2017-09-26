const path = require('path');
const currentDir = __dirname;

const defaultMongoBinDir = '/Users/gillyb/utilities/mongodb/bin';
const mongodExecutable = process.env['MONGOD'] || defaultMongoBinDir + '/mongod';

const dbName = process.env['MONGO_DB_NAME'] || 'ezresume';

module.exports = {

    db: {
        mongod: mongodExecutable,
        conf: path.join(currentDir, 'mongo.conf'),
        dbHost: 'mongodb://localhost/' + dbName,
    },
    auth: {
        session: {
            name: 'ezresume.session',
            secret: '__BUDhHa__'
        },
        facebook: {
            clientId: '1871475699757131',
            clientSecret: '4eb54970bafbfd0ba5d8e04aad7b1924'
        },
        google: {
            clientId: '373481859931-f7d3peuv6fd72bl8ih1bnpsfc14pungk.apps.googleusercontent.com',
            clientSecret: '-86GmSE0A4SmlaWMwHLV5R6_'
        }
    }

};