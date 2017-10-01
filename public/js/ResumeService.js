import EventEmitter from 'wolfy87-eventemitter';
import reqwest from 'reqwest';

import AuthService from './AuthService';
import LocalStorageService from './LocalStorageService';

class ResumeService extends EventEmitter {

    save(resumeObject) {

        if (!AuthService.isAuthenticated()) {
            // save resume locally
            const resumeLifetime = 60 * 24 * 7;     // save for a week
            LocalStorageService.set('_resume', resumeObject, resumeLifetime);

            this.emit('resume-saved-locally');
            return;
        }

        reqwest({
            url: '/resume/save',
            method: 'POST',
            type: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ resume: resumeObject }),
            credentials: 'same-origin',
            success: (resp) => {
                this.emit('resume-saved');
            },
            error: (err) => {
                this.emit('resume-saved-error');
            }
        });
    }

}

export default new ResumeService();