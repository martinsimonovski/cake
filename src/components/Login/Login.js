import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import * as authActions from '../../store/auth/actions'; 

class Login extends Component {

    onSubmit = (formProps) => {
        this.props.login(formProps, () => {
            this.props.history.push('/');
        });
    }

    render() {
        if (this.props.authenticated) {
            return <Redirect to="/" />;
        }

        const { handleSubmit } = this.props;

        return (
            <div className="bd-lead">
                <header className="bd-header">
                    <div className="bd-header-titles">
                        <h1 className="title">Login</h1>
                    </div>
                </header>
                <section className="section">
                    <div className="columns">
                        <div className="column"></div>
                        <div className="column is-two-thirds">
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control">
                                    <Field
                                        className="input"
                                        name="username"
                                        type="text"
                                        component="input"
                                        autoComplete="none"
                                    />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                    <Field
                                        className="input"
                                        name="password"
                                        type="password"
                                        component="input"
                                        autoComplete="none"
                                    />
                                    </div>
                                </div>
                                <div className="field is-grouped is-grouped-centered">
                                    <p className="control">
                                        <button className="button is-primary">Login</button>
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

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.errorMessage,
        authenticated: state.auth.authenticated
    };
}

export default {
    component: compose(
        connect(mapStateToProps, authActions),
        reduxForm({ form: 'login' })
    )(Login)
};