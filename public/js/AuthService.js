import EventEmitter from 'wolfy87-eventemitter';

export default class AuthService extends EventEmitter {

    constructor() {
        super();

        this.authenticated = false;

        window.setTimeout(() => {
            this.authenticated = true;
            this.trigger('logged-in');
        }, 4000);
    }

}