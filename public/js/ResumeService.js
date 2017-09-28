import EventEmitter from 'wolfy87-eventemitter';

class ResumeService extends EventEmitter {

    save() {
        // TODO: save to db
        //

        this.emit('resume');
        return;
    }

}

export default new ResumeService();