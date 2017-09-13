const _ = require('lodash');
const logger = require('./../logger');
const userService = require('./../services/user-service');

module.exports = function(app) {

    app.use((req, res, next) => {

        const loggedInUserId = _.get(req, 'session.passport.user');

        // if loggedInUserId === undefined => The user is not logged in, or has an invalid session
        if (loggedInUserId) {
            userService.getUserById(loggedInUserId).then((user) => {
                req.user = user;
            }).catch((err) => {
                logger.warn('Session exists, but failed to find user in db.', err);
            }).finally(() => {
                next();
            });
        }
        else {
            next();
        }

    });

};