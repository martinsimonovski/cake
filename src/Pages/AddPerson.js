import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import * as actions from "../store/actions";

class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formProps) {
    this.props.addPerson(formProps, () => {
      this.props.dispatch(reset("addPerson"));
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="bd-lead">
        <section className="section">
          <header className="bd-header">
            <div className="bd-header-titles">
              <h1 className="title has-text-centered">Persons</h1>
            </div>
          </header>
        </section>
        <section className="section">
          <div className="columns">
            <div className="column" />
            <div className="column is-two-thirds">
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="field">
                  <label className="label">First name:</label>
                  <div className="control">
                    <Field
                      className="input"
                      name="firstName"
                      type="text"
                      component="input"
                      autoComplete="none"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Last name:</label>
                  <div className="control">
                    <Field
                      className="input"
                      name="lastName"
                      type="text"
                      component="input"
                      autoComplete="none"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Birthday:</label>
                  <div className="control">
                    <Field
                      className="input"
                      name="birthday"
                      type="date"
                      component="input"
                      autoComplete="none"
                    />
                  </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                  <p className="control">
                    <button className="button is-info">Add</button>
                  </p>
                </div>
                {this.props.persons.errorMessage && (
                  <article className="message is-danger">
                    <div className="message-body">
                      {this.props.persons.errorMessage}
                    </div>
                  </article>
                )}
              </form>
            </div>
            <div className="column" />
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    persons: state.persons,
    group: state.group
  };
}

export default {
  component: compose(
    connect(
      mapStateToProps,
      actions
    ),
    reduxForm({ form: "addPerson" })
  )(AddPerson)
};
