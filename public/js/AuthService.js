import EventEmitter from 'wolfy87-eventemitter';

class AuthService extends EventEmitter {

    authenticated = false;

    constructor() {
        super();

        window.setTimeout(() => {
            this.trigger('open-login');
        }, 5000);
    }

}

export default new AuthService();