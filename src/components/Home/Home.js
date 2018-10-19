import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPersons } from '../../store/actions';
import Persons from '../Persons/Persons';

class Home extends Component {
    componentDidMount() {
        this.props.fetchPersons();
    }

    render() {
        return (
            <div>
                <h1>Welcome to CAKE</h1>
                <Persons persons={this.props.persons} />
            </div>
        );
    }
}

function mapStateToProps({ persons }) {
    return {
        persons: persons
    };
}

function loadPersons(store) {
    return store.dispatch(fetchPersons());
}

export default {
    loadPersons,
    component: connect(mapStateToProps, {fetchPersons})(Home)
};