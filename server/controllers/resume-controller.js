const resumeService = require('./../services/resume-service');

module.exports = (app) => {

    app.post('/resume/save', (req, res) => {

        const user = req.user ? req.user : undefined;
        if (!user) {
            res.sendStatus(401);
            return;
        }

        const resume = req.body.resume;
        // TODO: validate the resume according to the Resume schema

        resumeService.saveResume(resume);

    });

};