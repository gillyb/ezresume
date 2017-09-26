const User = require('./../models/user');
const config = require('./../config/config-loader');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// TODO: Make sure all the session initialization comes after the static file routes configuration in expressjs
// TODO: Not sure we need to write/read from db in serializeUser/deserializeUser

module.exports = (app) => {

    passport.use(new GoogleStrategy({
            clientID: config.auth.google.clientId,
            clientSecret: config.auth.google.clientSecret,
            // TODO: extract this url to a config variable
            callbackURL: 'http://localhost:5000/login/google/callback'
        },
        function (accessToken, refreshToken, profile, cb) {

            // TODO: check if we can get the user's email too.
            User.findOne({ googleId: profile.id }, (err, user) => {
                if (err)
                    return cb('There was an error!!!'); // TODO: handle this better

                if (user)
                    return cb(null, user);

                let newUser = new User({
                    displayName: profile.displayName || (profile.name.givenName + ' ' + profile.name.familyName),
                    provider: profile.provider,
                    googleId: profile.id
                });
                newUser.save((err) => {
                    if (err)
                        return cb('There was an error creating a new user');

                    cb(null, newUser);
                });
            });
        }));

    app.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
    app.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/');
    });

};