import EventEmitter from 'wolfy87-eventemitter';

class ResumeService extends EventEmitter {

    save() {
        this.emit('resume');

        // TODO: save to db
        return;
    }

}

export default new ResumeService();