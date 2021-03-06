import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPersons, deletePerson } from "../store/actions";

class ListPersons extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchPersons();
  }

  renderDate(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Noe",
      "Dec"
    ];
    const d = new Date(date);
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const styles = {
      fontFamily: "monospace"
    };
    return (
      <span style={styles}>
        {`${day} ${months[d.getMonth()]} ${d.getFullYear()}`}
      </span>
    );
  }

  handleDelete(personId) {
    if (window.confirm("Are you sure?")) {
      this.props.deletePerson(personId, () => {
        if (this.props.persons.errorMessage) {
          window.alert(`Error deleting: ${this.props.persons.errorMessage}`);
        }
      });
    }
  }

  renderPersons() {
    let number = 1;
    return this.props.persons.data.map(person => {
      return (
        <tr key={person._id}>
          <td>{number++}</td>
          <td>
            {person.firstName} {person.lastName}
          </td>
          <td>{this.renderDate(person.birthday)}</td>
          <td className="tdContainer">
            <button
              className="button is-danger"
              onClick={() => this.handleDelete(person._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <section className="section container">
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Birthday</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderPersons()}</tbody>
        </table>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    persons: state.persons
  };
}

const mapDispatchToProps = dispatch => ({
  fetchPersons: () => dispatch(fetchPersons()),
  deletePerson: (id, callback) => dispatch(deletePerson(id, callback))
});

export default {
  component: connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListPersons)
};
