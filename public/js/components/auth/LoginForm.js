import React from 'react';

import AuthService from './../../AuthService';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: false
        };
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title justify-content-center">Login</h4>
                            <p className="card-text">Login with one of these social network providers.</p>

                            {/* TODO: maybe this will work in the future */}
                            {/*<div className="form-group">*/}
                                {/*/!*<label for="exampleInputEmail1">Email address</label>*!/*/}
                                {/*<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />*/}
                            {/*</div>*/}
                            {/*<div className="form-group">*/}
                                {/*/!*<label for="exampleInputPassword1">Password</label>*!/*/}
                                {/*<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />*/}
                            {/*</div>*/}

                            {/*<div className="form-group">*/}
                                {/*<a href="#" className="btn btn-primary">Login</a>*/}
                            {/*</div>*/}
                            {/*<hr />*/}

                            <div className="social-buttons">
                                <div className="form-group">
                                    <a href="/login/facebook">
                                        <button type="button" className="facebook btn btn-primary btn-block"><i className="fa fa-facebook"></i>facebook</button>
                                    </a>
                                </div><div className="form-group">
                                    <a href="/login/google">
                                        <button type="button" className="google btn btn-primary btn-block"><i className="fa fa-google"></i>Google</button>
                                    </a>
                                </div><div className="form-group">
                                    <button type="button" className="linkedin btn btn-primary btn-block"><i className="fa fa-linkedin"></i>LinkedIn</button>
                                </div><div className="form-group">
                                    <button type="button" className="github last btn btn-primary btn-block"><i className="fa fa-github"></i>GitHub</button>
                                </div>
                            </div>
                            <small className="text-muted">
                                We promise to never send any annoying emails.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}