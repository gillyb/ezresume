import EventEmitter from 'wolfy87-eventemitter';
import reqwest from 'reqwest';

class ResumeService extends EventEmitter {

    save(resumeObject) {
        // TODO: save to db
        //
        reqwest({
            url: '/resume/save',
            method: 'POST',
            type: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ resume: resumeObject }),
            credentials: 'same-origin',
            success: (resp) => {
                // TODO: !!
                window.alert('saved');
            },
            error: (err) => {
                // TODO: !!
                window.alert('error');
            }
        });

        this.emit('resume');
        return;
    }

}

export default new ResumeService();