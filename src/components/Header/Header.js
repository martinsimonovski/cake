import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, createGroup } from "../../store/actions";

class Header extends Component {
  // to get the props into the <a> we need to bind it
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  renderAuthenticatedButtons() {
    if (this.props.auth.authenticated) {
      return (
        <Fragment>
          <div className="navbar-item has-dropdown is-hoverable">
            <span className="navbar-link button">Persons</span>

            <div className="navbar-dropdown">
              <Link to="/persons/add" className="navbar-item">
                <strong>Add</strong>
              </Link>
              <Link to="/persons" className="navbar-item">
                List
              </Link>
            </div>
          </div>
        </Fragment>
      );
    }
    return "";
  }

  renderGroupButtons() {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <span className="navbar-link button">Group</span>

        <div className="navbar-dropdown">
          {this.props.auth.authenticated && (
            <Link to="/groups/add" className="navbar-item">
              <strong>Add</strong>
            </Link>
          )}
          <Link to="/groups" className="navbar-item">
            List
          </Link>
        </div>
      </div>
    );
  }

  renderAuthButton() {
    if (this.props.auth.authenticated) {
      return (
        <Link to="/" className="button is-light" onClick={this.handleLogout}>
          Logout
        </Link>
      );
    }

    return (
      <Link to="/login" className="button is-light">
        Login
      </Link>
    );
  }

  render() {
    return (
      <nav className="navbar has-shadow is-spaced">
        <section className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src="/cake.png" alt="Cake Logo" />{" "}
              <strong style={{ fontSize: "20px" }}>PolarCAKE</strong>
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="buttons">
                {this.renderAuthenticatedButtons()}
                {this.renderGroupButtons()}
                {this.renderAuthButton()}
              </div>
            </div>
          </div>
        </section>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  createGroup: callback => dispatch(createGroup(callback))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
