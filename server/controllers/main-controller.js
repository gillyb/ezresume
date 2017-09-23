const resumeService = require('./../services/resume-service');

module.exports = (app) => {

    app.get('/', (req, res) => {

        const user = req.user ? req.user : undefined;
        resumeService.getDemoResume().then((demoResume) => {

            res.render('main', {
                user: user,
                resume: demoResume
            });
        });
    });

};