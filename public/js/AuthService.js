import EventEmitter from 'wolfy87-eventemitter';

class AuthService extends EventEmitter {

    currentUser = undefined;

    constructor() {
        super();

        const userData = document.getElementById('user-object').innerText;
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
            }
            catch (e) {
                // TODO: maybe show some error message to the user, or just go on gracefully
            }
        }
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getUser() {
        return this.currentUser;
    }

}

export default new AuthService();