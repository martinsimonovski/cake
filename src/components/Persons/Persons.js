import React, { Component } from 'react';
import Switch from '../Switch/Switch';
import './persons.css';

class Persons extends Component {

    constructor(props) {
        super(props);
        this.handlePayed = this.handlePayed.bind(this);
    }

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
                    <td className="tdContainer">
                        { this.renderPayed(person) }
                    </td>
                </tr>
            );
        });
    }

    handlePayed(info) {
        this.props.handlePayed(info); // call the parent function
    }

    renderPayed(person) {
        const payed = this.props.group.payedIds.includes(person._id);
        
        if (!this.props.auth.authenticated) {
            return (
                <span style={{color: '#209cee'}}>&#10004;</span>
            );
        }

        return (<Switch 
            label="Switch No Text" 
            noText={true} 
            id={person._id} 
            groupId={this.props.group._id}
            checked={payed}
            handlePayed={this.handlePayed} />);
    }

    render() {
        console.log('props:', this.props);
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