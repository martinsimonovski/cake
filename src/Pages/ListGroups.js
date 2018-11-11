import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGroups } from "../store/actions";
import "./groups.css";

class ListGroups extends Component {
  componentDidMount() {
    this.props.fetchGroups();
  }

  renderGroup(group) {
    const { startDate } = group;
    const monthNames = [
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

    const link = `/groups/${group._id}`;

    return (
      <Link to={link} className="group-card" key={group._id}>
        <span className="month">
          {monthNames[new Date(startDate).getMonth()]}
        </span>
        <span className="year">{new Date(startDate).getFullYear()}</span>
      </Link>
    );
  }

  render() {
    if (this.props.groups.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <section className="section container groups">
        {this.props.groups.map(group => {
          return this.renderGroup(group);
        })}
      </section>
    );
  }
}

function mapStateToProps({ groups }) {
  return {
    groups
  };
}

const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups())
});

export default {
  component: connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListGroups)
};
