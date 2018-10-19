import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions';

class Header extends Component {

    // to get the props into the <a> we need to bind it
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(authActions.logout());
    }

    renderAuthenticatedButtons() {
        if (this.props.auth.authenticated) {
            return (
                <Fragment>
                    <a className="button"><strong>Persons</strong></a>
                    <a className="button"><strong>Create Group</strong></a>
                </Fragment>
            )
        }
        return '';
    }

    render() {
        const authButton = this.props.auth.authenticated ?
            (<Link to="/" className="button is-light" onClick={this.handleLogout}>Logout</Link>) :
            (<Link to="/login" className="button is-light">Login</Link>);

        return (
            <nav className="navbar has-shadow is-spaced">
                <section className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">
                            <img src="/cake.png" /> <strong>CAKE</strong>
                        </Link>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">

                            <div className="buttons">
                                <a className="button"><strong>Payments</strong></a>
                                {this.renderAuthenticatedButtons()}
                                {authButton}
                            </div>
                        </div>
                    </div>
                </section>
            </nav >
        );
    };
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);