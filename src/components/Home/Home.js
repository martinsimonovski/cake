import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPersons, fetchCurrentGroup, updateGroup } from '../../store/actions';
import Persons from '../Persons/Persons';
import Group from '../Group/Group';

class Home extends Component {
    constructor(props) {
        super(props);

        this.handlePayed = this.handlePayed.bind(this);
    }

    componentDidMount() {
        this.props.fetchCurrentGroup();
        this.props.fetchPersons();
    }

    getBirthdayUsers() {
        if (this.props.persons.length === 0) {
            return [];
        }

        return this.props.persons.data.filter(person => {
            return this.props.group.birthdayIds.includes(person._id)
        });
    }

    handlePayed({ groupId, personId, payed }) {
        this.props.updateGroup({ groupId, personId, payed });
    }

    render() {
        const personsInfo = this.getBirthdayUsers();
        return (
            <div>
                <Group group={this.props.group} personsInfo={personsInfo} />
                <section className="section container">
                    <Persons
                        persons={this.props.persons.data}
                        group={this.props.group}
                        auth={this.props.auth}
                        handlePayed={this.handlePayed} />
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
    fetchCurrentGroup: () => dispatch(fetchCurrentGroup()),
    updateGroup: (params) => dispatch(updateGroup(params))
});

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(Home)
};