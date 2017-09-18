const mongoose = require('mongoose');
const Promise = require('bluebird');

const logger = require('./../logger');
const User = require('./../models/user');
const Resume = require('./../models/resume');

module.exports = {

    // TODO: this is just temporary!
    getDemoResume: function() {

        return Promise.resolve({
            userId: new mongoose.Types.ObjectId(),

            generalDetails: {
                jobTitle: 'Senior Full Stack Engineer',
                aboutYou: 'I am the best, no doubt! word!',
            },

            workExperience: [{
                companyName: 'Logz.io',
                companyWebsite: 'http://logz.io',
                jobTitle: 'Front-End Team Leader',
                startDate: new Date(),
                endDate: new Date(),
                summary: 'Was the best there, so they fired me',
                bullets: [
                    'Was the best',
                    'Still am the best',
                    'Always will be the best'
                ]
            }],
            education: [{
                school: 'The Open University',
                degree: 'B.Sc.',
                major: 'Computer Science',
                startDate: new Date(),
                endDate: new Date(),
                summary: 'Finished as the best in my class.'
            }],
            // projects: [{
            //     projectName: String,
            //     role: String,
            //     website: String,
            //     startDate: Date,
            //     endDate: Date,
            //     summary: String
            // }],
            skills: ['C#', 'Java', 'NodeJS', 'ElasticSearch'],
            contactInfo: {
                email: 'gillyb@gmail.com',
                phone: '054-5623450',
                website: 'http://www.gillybarr.com',
                city: 'Kfar Saba',
                state: 'Israel'
            },
            slug: 'gilly-barr',

            created: new Date(),
            updated: new Date()
        });
    },

    getResumeById: function(resumeId) {
        return Resume.findOne({ _id: resumeId }).exec().catch((err) => {
            logger.error('Failed to find resume id : ' + resumeId, err);
        });
    },

    getResumesByUser: function(userId) {
        return Resume.find({ userId: userId }).exec().catch((err) => {
            logger.error('Failed to find resumes by userId : ' + userId, err);
        });
    },

    saveResume: function(resume) {
        // TODO: implement this!
    }

};