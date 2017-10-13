const resumeService = require('./../services/resume-service');

module.exports = (app) => {

    app.get('*', (req, res) => {

        const user = req.user ? req.user : undefined;

        if (user) {
            // A registered user must have at least one saved resume (even if it's a demo resume, it was saved)
            resumeService.getLastEditedResume(user.id).then((resume) => {

                if (resume && resume.length > 0) {
                    res.render('main', {
                        user,
                        resume: resume[0]
                    });
                    return;
                }

                // If the user doesn't have a resume yet, then return a demo resume
                resumeService.getDemoResume().then((demoResume) => {
                    res.render('main', {
                        user,
                        resume: demoResume
                    });
                });
            });
        }
        else {
            // Anonymous user - we will send the client a demo resume, but their might be one saved locally already.
            // If there is, we won't use this one
            resumeService.getDemoResume().then((demoResume) => {
                res.render('main', {
                    user: user,
                    resume: demoResume
                });
            });
        }
    });

};