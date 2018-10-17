import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {


    render() {
        const authButton = this.props.auth.authenticated ?
        (<a href="/api/logout">Logout</a>) :
        (<Link to="/login" className="navbar-item">Login</Link>);
        
        return (
            <nav className="navbar has-shadow is-spaced">
                <section className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">CAKE</Link>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            { authButton }
                        </div>
                    </div>
                </section>
            </nav>
        );
    };
}

function mapStateToProps( {auth}) {
    return { auth };
}

export default connect(mapStateToProps)(Header);