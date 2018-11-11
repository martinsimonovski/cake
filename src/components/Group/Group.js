import React, { Component } from "react";
import "./group.css";

class Group extends Component {
  renderTitle() {
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

    const { group } = this.props;
    let startDate = new Date(group.startDate);
    return <h1 className="title">{months[startDate.getMonth()]}</h1>;
  }

  renderBirthdays() {
    return this.props.personsInfo.map(person => {
      const bday = new Date(person.birthday);
      return (
        <li key={person._id}>
          {person.firstName} {person.lastName} - {bday.getDate()}.
          {bday.getMonth() + 1}{" "}
        </li>
      );
    });
  }

  render() {
    return (
      <section className="hero is-info is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            {this.renderTitle()}
            <h1 className="subtitle">{this.props.group.price} den.</h1>
            <section className="section">
              <ul>{this.renderBirthdays()}</ul>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

export default Group;
