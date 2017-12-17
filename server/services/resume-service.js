const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const logger = require('./../logger');
const User = require('./../models/user');
const Resume = require('./../models/resume');

module.exports = {

    // TODO: this is just temporary!
    getDemoResume: function() {

        return Promise.resolve({
            userId: new mongoose.Types.ObjectId(),

            fullName: 'Gilly Barr',

            generalDetails: {
                jobTitle: 'Senior Full Stack Engineer',
                aboutYou: 'I am the best, no doubt! word!'
            },
            onlinePresence: {
                links: [
                    'http://facebook.com/gilly-barr',
                    'https://github.com/gillyb'
                ]
            },
            workExperience: [{
                companyName: 'Logz.io',
                companyWebsite: 'http://logz.io',
                jobTitle: 'Front-End Team Leader',
                period: {
                    startDate: { day:0, month:2, year:2015 },
                    endDate: { day:0, month:12, year:2016 }
                },
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
                period: {
                    startDate: { day:0, month:0, year:0 },
                    endDate: { day:0, month:0, year:0 }
                },
                summary: 'Finished as the best in my class.',
            }],
            // projects: [{
            //     projectName: String,
            //     role: String,
            //     website: String,
            //     period: {
            //         startDate: { day:0, month:0, year:0 },
            //         endDate: { day:0, month:0, year:0 }
            //     },
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

        // TODO: make sure the user has permissions for this

        // const overrideProperties = ['generalDetails', 'onlinePresence', 'workExperience', 'projects', 'education', 'skills', 'contactInfo'];

        // strip the resume from what shouldn't be here
        // Object.keys(resume).forEach((resumeKey) => {
        //     if (overrideProperties.indexOf(resumeKey) === -1)
        //         delete resume[resumeKey];
        // });

        if (resume._id) {
            return Resume.findById(resume._id).exec().then((doc) => {

                // copy changed properties to the db resume model
                _.assign(doc, resume);

                // TODO: maybe check for error too
                return doc.save();
            }).catch((err) => {
                return Promise.reject(err);
            });
        }

        // resume doesn't exist in db - create it
        const newResume = new Resume(resume);
        return newResume.save();        // TODO: maybe we should check for error too
    },

    getLastEditedResume: function(userId) {
        return Resume.find({ userId: userId })
            .sort({ updated: 1 })
            .exec().then((resume) => {
            return resume;
        });
    }

};