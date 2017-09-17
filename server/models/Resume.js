const mongoose = require('mongoose');

var resumeSchema = mongoose.Schema({

    userId: mongoose.Schema.ObjectId,

    jobTitle: String,
    aboutYou: String,

    workExperience: [{
        companyName: String,
        companyWebsite: String,
        jobTitle: String,
        startDate: Date,
        endDate: Date,
        summary: String,
        bullets: [String]
    }],
    education: [{
        school: String,
        degree: String,
        major: String,
        startDate: Date,
        endDate: Date,
        summary: String
    }],
    projects: [{
        projectName: String,
        role: String,
        website: String,
        startDate: Date,
        endDate: Date,
        summary: String
    }],
    skills: [String],
    contactInfo: {
        email: String,
        phone: String,
        website: String,
        city: String,
        state: String
    },
    slug: String,

    created: Date,
    updated: Date
});

resumeSchema.pre('save', function(next) {
    var user = this;
    user.updated = new Date();
    next();
});

module.exports = mongoose.model('Resume', resumeSchema);
