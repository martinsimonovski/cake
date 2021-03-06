import React, { Component } from "react";
import { connect } from "react-redux";
import Persons from "../components/Persons/Persons";
import {
  fetchPersons,
  fetchGroup,
  updateGroup,
  setActiveGroup
} from "../store/actions";

class GroupDetails extends Component {
  constructor(props) {
    super(props);

    this.handlePayed = this.handlePayed.bind(this);
    this.handleActiveClick = this.handleActiveClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.id);
    this.props.fetchPersons();
  }

  renderBirthdays(personsInfo) {
    return personsInfo.map(person => {
      return (
        <li key={person._id}>
          {person.firstName} {person.lastName}
        </li>
      );
    });
  }

  handlePayed({ groupId, personId, payed }) {
    this.props.updateGroup({ groupId, personId, payed });
  }

  handleActiveClick() {
    this.props.setActiveGroup(this.props.group._id, () => {
      alert("Group is set to active");
    });
  }

  renderActiveButton() {
    if (this.props.auth.authenticated) {
      return (
        <button className="button is-info" onClick={this.handleActiveClick}>
          Set as current
        </button>
      );
    }

    return "";
  }

  renderGroup() {
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
    let date = new Date(this.props.group.startDate);

    const personsInfo = this.getBirthdayUsers();

    return (
      <section className="section container">
        <h1 className="title">
          {months[date.getMonth()]} {this.renderActiveButton()}
        </h1>
        {this.renderBirthdays(personsInfo)}
      </section>
    );
  }

  getBirthdayUsers() {
    if (this.props.group && this.props.persons.data) {
      return this.props.persons.data.filter(person => {
        return this.props.group.birthdayIds.includes(person._id);
      });
    }

    return [];
  }

  render() {
    if (!this.props.group._id || this.props.persons.data.length === 0) {
      return <div>Loading</div>;
    }

    return (
      <div className="bd-lead">
        <section className="section">
          <header className="bd-header">
            <div className="bd-header-titles">
              <h1 className="title has-text-centered">Group Details</h1>
            </div>
          </header>
        </section>
        {this.renderGroup()}
        <section className="section container">
          <h1 className="subtitle">List of people who haven't payed</h1>
          <Persons
            persons={this.props.persons.data}
            group={this.props.group}
            auth={this.props.auth}
            handlePayed={this.handlePayed}
          />
        </section>
      </div>
    );
  }
}

function mapStateToProps({ group, persons, auth }) {
  return {
    persons,
    group,
    auth
  };
}

const mapDispatchToProps = dispatch => ({
  fetchPersons: () => dispatch(fetchPersons()),
  fetchGroup: id => dispatch(fetchGroup(id)),
  updateGroup: params => dispatch(updateGroup(params)),
  setActiveGroup: (groupId, fn) => dispatch(setActiveGroup(groupId, fn))
});

export default {
  component: connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupDetails)
};
