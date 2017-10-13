import Promise from 'bluebird';
import EventEmitter from 'wolfy87-eventemitter';
import reqwest from 'reqwest';

import AuthService from './AuthService';
import LocalStorageService from './LocalStorageService';

class ResumeService extends EventEmitter {

    save(resumeObject) {

        if (!AuthService.isAuthenticated()) {
            this.setLocalResume(resumeObject);
            this.emit('resume-saved-locally');
            return Promise.resolve();
        }

        // user is authenticated - send resume to server
        return new Promise((resolve, reject) => {
            reqwest({
                url: '/resume/save',
                method: 'POST',
                type: 'json',
                contentType: 'application/json',
                data: JSON.stringify({ resume: resumeObject }),
                credentials: 'same-origin',
                success: (updatedResume) => {
                    this.clearLocalResume();

                    // TODO: extract this to a separate service
                    // const resumeHolderElement = document.getElementById('resume-object');
                    // const localResumeObject = JSON.parse(resumeHolderElement.innerText);
                    // localResumeObject._id = updatedResume._id;
                    // resumeHolderElement.innerText = JSON.stringify(localResumeObject);

                    this.emit('resume-saved');
                    resolve(updatedResume._id);
                },
                error: (err) => {
                    this.emit('resume-saved-error');
                    reject(err);
                }
            });
        });
    }

    getLocalResume() {
        return LocalStorageService.get('_resume');
    }

    setLocalResume(resumeObject) {
        const resumeLifetime = 60 * 24 * 7;     // save for a week
        LocalStorageService.set('_resume', resumeObject, resumeLifetime);
    }

    clearLocalResume() {
        LocalStorageService.remove('_resume');
    }

}

export default new ResumeService();