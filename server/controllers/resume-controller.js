const fs = require('fs');
const path = require('path');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, './../../uploads') });

const resumeService = require('./../services/resume-service');
const fakeDataService = require('./../services/fake-data-service');

module.exports = (app) => {

    app.post('/resume/save', (req, res) => {

        const user = req.user ? req.user : undefined;
        if (!user) {
            res.sendStatus(401);
            return;
        }

        const resume = req.body.resume;
        resume.userId = user;

        // TODO: validate the resume according to the Resume schema
        //       (I think mongoose does this automatically - check!)

        resumeService.saveResume(resume).then((updatedResume) => {
            res.json(updatedResume);
        }).catch((err) => {
            // TODO: do something useful with this error
            console.log(err);
            res.sendStatus(500);
        });

    });

    app.post('/resume/new-section', (req, res) => {
        const dataType = req.body.type;
        if (!dataType) {
            res.sendStatus(400);
            return;
        }

        switch (dataType) {
            case 'generalDetails':
                res.json(fakeDataService.getFakeGeneralDetails());
                break;
            case 'name':
                res.json(fakeDataService.getFakeName());
                break;
            case 'workExperience':
                res.json(fakeDataService.getFakeWorkExperience());
                break;
            case 'onlinePresence':
                res.json(fakeDataService.getFakeOnlinePresence());
                break;
            case 'education':
                res.json(fakeDataService.getFakeEducation());
                break;
            case 'skills':
                res.json(fakeDataService.getFakeSkills());
                break;
            case 'projects':
                res.json(fakeDataService.getFakeProject());
                break;
            case 'contactInfo':
                res.json(fakeDataService.getFakeContactInfo());
                break;
            default:
                res.sendStatus(400);
        }
    });

    app.post('/resume/upload-image', upload.single('headshot'), (req, res) => {
      // TODO: make sure a user is logged in!
      // TODO: make sure we know which resume we're associating this image with!

      const newFileName = req.file.path + '.' + req.file.originalname;
      fs.rename(req.file.path, newFileName, (err) => {
          if (err)
              throw new Error(err); // TODO: we probably want to do something with the error!

          res.json({
            filename: newFileName.substr(newFileName.lastIndexOf('/'))
          });
      });

    });

};