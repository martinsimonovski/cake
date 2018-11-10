import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import * as actions from "../store/actions";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formProps) {
    this.props.createCustomGroup(formProps, () => {
      this.props.dispatch(reset("addGroup"));
    });
  }

  renderMonths() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return months.map((month, index) => {
      return (
        <option key={index} value={index}>
          {month}
        </option>
      );
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="bd-lead">
        <section className="section">
          <header className="bd-header">
            <div className="bd-header-titles">
              <h1 className="title has-text-centered">Add Group</h1>
            </div>
          </header>
        </section>
        <section className="section">
          <div className="columns">
            <div className="column" />
            <div className="column is-one-thirdf">
              <form onSubmit={handleSubmit(this.onSubmit)} name="addGroup">
                <div className="field">
                  <label className="label">Month:</label>
                  <div className="control">
                    <Field
                      className="input"
                      name="month"
                      component="select"
                      autoComplete="none"
                    >
                      <option />
                      {this.renderMonths()}
                    </Field>
                  </div>
                </div>

                <div className="field">
                  <Field
                    name="active"
                    id="active"
                    type="checkbox"
                    component="input"
                  />
                  <label htmlFor="active">Set active</label>
                </div>

                <div className="field is-grouped is-grouped-centered">
                  <p className="control">
                    <button className="button is-info">Add</button>
                  </p>
                </div>
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
    group: state.group,
    persons: state.persons
  };
}

export default {
  component: compose(
    connect(
      mapStateToProps,
      actions
    ),
    reduxForm({ form: "addGroup" })
  )(AddGroup)
};
