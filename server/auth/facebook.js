const User = require('./../models/user');
const config = require('./../config/config-loader');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// TODO: Make sure all the session initialization comes after the static file routes configuration in expressjs
// TODO: Not sure we need to write/read from db in serializeUser/deserializeUser

module.exports = (app) => {

    passport.use(new FacebookStrategy({
            clientID: config.auth.facebook.clientId,
            clientSecret: config.auth.facebook.clientSecret,
            // TODO: extract this url to a config variable
            callbackURL: 'http://localhost:5000/login/facebook/return',
            profileFields: ['id', 'email', 'name']      // Not all facebook users have emails
        },
        function (accessToken, refreshToken, profile, cb) {

            // TODO: check if we can get the user's email too.
            User.findOne({ facebookId: profile.id }, (err, user) => {
                if (err)
                    return cb('There was an error!!!'); // TODO: handle this better

                if (user)
                    return cb(null, user);

                let newUser = new User({
                    displayName: profile.displayName || (profile.name.givenName + ' ' + profile.name.familyName),
                    provider: profile.provider,
                    facebookId: profile.id
                });
                newUser.save((err) => {
                    if (err)
                        return cb('There was an error creating a new user');

                    cb(null, newUser);
                });
            });
        }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // TODO: maybe we should add some internal cache for this
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    app.get('/login/facebook', passport.authenticate('facebook'));
    app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/');
    });

};