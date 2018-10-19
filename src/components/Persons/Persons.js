import React, { Component } from 'react';

class Persons extends Component {

    renderPersons() {
        return this.props.persons.map(person => {
            return (
                <tr key={person._id}>
                    <td>
                    {person.firstName} {person.lastName}
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