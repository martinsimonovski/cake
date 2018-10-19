import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPersons } from '../../store/actions';
import { fetchCurrentGroup } from '../../store/actions';
import Persons from '../Persons/Persons';
import Group from '../Group/Group';

class Home extends Component {
    componentDidMount() {
        this.props.fetchCurrentGroup();
        this.props.fetchPersons();
    }

    getBirthdayUsers() {
        if (this.props.persons.length === undefined) {
            return [];
        }

        return this.props.persons.filter(person => {
            return this.props.group.birthdayIds.includes(person._id)
        });
    }

    render() {
        const personsInfo = this.getBirthdayUsers();
        return (
            <div>
                <Group group={this.props.group} personsInfo={personsInfo} />
                <section className="section container">
                    <Persons persons={this.props.persons} group={this.props.group} />
                </section>
            </div>
        );
    }
}

function mapStateToProps({ group, persons }) {
    return {
        persons,
        group
    };
}

function loadPersons(store) {
    return store.dispatch(fetchPersons());
}

function loadCurrentGroup(store) {
    return store.dispatch(fetchCurrentGroup());
}

export default {
    loadCurrentGroup,
    loadPersons,
    component: connect(mapStateToProps, {fetchPersons, fetchCurrentGroup})(Home)
};