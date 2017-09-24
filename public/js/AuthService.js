import { observable, action } from 'mobx';

export default class AuthService {

    @observable
    authenticated = false;

    constructor() {
        // this.authenticated = false;

        window.setTimeout(action(() => {
            this.authenticated = true;
        }), 4000);
    }

    // @observable
    // static isLoggedIn() {
    //     // return this.authenticated;
    // }

}