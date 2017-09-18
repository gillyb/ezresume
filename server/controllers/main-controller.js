const resumeService = require('./../services/resume-service');

module.exports = (app) => {

    app.get('/', (req, res) => {
        resumeService.getDemoResume().then((demoResume) => {
            res.render('main', { resume: demoResume });
        });
    });

};
