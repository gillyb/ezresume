const logger = require('./../logger');
const User = require('./../models/user');
const Resume = require('./../models/resume');

module.exports = {

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