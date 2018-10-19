import React, { Component } from 'react';

class Persons extends Component {

    getPrice({ _id }) {
        if (this.props.group.birthdayIds.includes(_id)) {
            return this.props.group.price - 100;
        }

        return this.props.group.price;
    }

    renderPersons() {
        return this.props.persons.map(person => {
            return (
                <tr key={person._id}>
                    <td>
                    {person.firstName} {person.lastName}
                    </td>
                    <td>
                        { this.getPrice(person) } den.
                    </td>
                    <td>
                        
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Payed</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderPersons()}
                </tbody>
            </table>);
    }
}

export default Persons;