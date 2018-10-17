import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav className="navbar has-shadow is-spaced">
                <section className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item">CAKE</a>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <a className="navbar-item">Login</a>
                        </div>
                    </div>
                </section>
            </nav>
        );
    };
}

export default Header;