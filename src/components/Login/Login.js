import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="bd-lead">
                <header className="bd-header">
                    <div className="bd-header-titles">
                        <h1 className="title">Login</h1>
                    </div>
                </header>
                <section class="section">
                    <div className="columns">
                        <div className="column"></div>
                        <div className="column is-two-thirds">
                            <form>
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control">
                                        <input className="input" type="text" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input className="input" type="password" />
                                    </div>
                                </div>
                                <div className="field is-grouped is-grouped-centered">
                                    <p className="control">
                                        <a className="button is-primary">Login</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className="column"></div>
                    </div>
                </section>
            </div>
        );
    }
};

export default Login;