import React, { Component } from 'react';
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

    render() {
        const authButton = this.props.auth.authenticated ?
            (<Link to="/" onClick={this.handleLogout}>Logout</Link>) :
            (<Link to="/login" className="navbar-item">Login</Link>);

        return (
            <nav className="navbar has-shadow is-spaced">
                <section className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">CAKE</Link>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            {authButton}
                        </div>
                    </div>
                </section>
            </nav>
        );
    };
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);