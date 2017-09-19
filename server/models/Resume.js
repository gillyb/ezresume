const mongoose = require('mongoose');

var resumeSchema = mongoose.Schema({

    userId: mongoose.Schema.ObjectId,

    generalDetails: {
        jobTitle: String,
        aboutYou: String,
        socialMedia: {
            links: [String]
        },
    },

    workExperience: [{
        companyName: String,
        companyWebsite: String,
        jobTitle: String,
        period: {
            startDate: {
                day: Number,
                month: Number,
                year: Number
            },
            endDate: {
                day: Number,
                month: Number,
                year: Number
            }
        },
        summary: String,
        bullets: [String]
    }],
    education: [{
        school: String,
        degree: String,
        major: String,
        period: {
            startDate: {
                day: Number,
                month: Number,
                year: Number
            },
            endDate: {
                day: Number,
                month: Number,
                year: Number
            }
        },
        summary: String,
        bullets: [String]
    }],
    projects: [{
        projectName: String,
        role: String,
        website: String,
        period: {
            startDate: {
                day: Number,
                month: Number,
                year: Number
            },
            endDate: {
                day: Number,
                month: Number,
                year: Number
            }
        },
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
