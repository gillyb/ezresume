const logger = require('./../logger');
const User = require('./../models/user');

module.exports = {

    getUserById: function(userId) {
        return User.findOne({ _id: userId }).exec().catch((err) => {
            logger.warn('Failed to find user : ' + userId, err);
        });
    }

};