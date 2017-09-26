const mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    displayName: String,
    email: String,
    password: String,       // hash

    provider: String,
    facebookId: String,
    googleId: String,

    created: Date,
    updated: Date
});

userSchema.pre('save', function(next) {
    var user = this;
    user.updated = new Date();
    next();
});

module.exports = mongoose.model('User', userSchema);
