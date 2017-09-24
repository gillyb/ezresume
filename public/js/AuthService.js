import EventEmitter from 'wolfy87-eventemitter';

class AuthService extends EventEmitter {

    authenticated = false;

    constructor() {
        super();
    }

}

export default new AuthService();