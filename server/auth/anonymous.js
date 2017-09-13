const passport = require('passport');
const AnonymousStrategy = require('passport-anonymous').Strategy;

module.exports = (app) => {

    passport.use(new AnonymousStrategy());

};