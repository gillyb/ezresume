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
                            <p className="card-text">Login using a username and password.</p>

                            <div className="form-group">
                                {/*<label for="exampleInputEmail1">Email address</label>*/}
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                {/*<label for="exampleInputPassword1">Password</label>*/}
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>

                            <div className="form-group">
                                <a href="#" className="btn btn-primary">Login</a>
                            </div>
                            <hr />
                            <div className="form-group social-buttons">
                                <button type="button" className="facebook btn btn-primary btn-sm"><i className="fa fa-facebook"></i>facebook</button>
                                <button type="button" className="google btn btn-primary btn-sm"><i className="fa fa-google"></i>Google</button>
                                <button type="button" className="linkedin btn btn-primary btn-sm"><i className="fa fa-linkedin"></i>LinkedIn</button>
                                <button type="button" className="github btn btn-primary btn-sm"><i className="fa fa-github"></i>GitHub</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}