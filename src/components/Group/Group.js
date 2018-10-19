import React, { Component } from 'react';

class Group extends Component {
    // let map = [];
    // personsInfo.map(person => map[person._id] = person);
    renderTitle() {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const { group } = this.props;
        let startDate = new Date(group.startDate);
        let endDate = new Date(group.endDate);

        const title = `${startDate.getDate()} ${months[startDate.getMonth()]} - ${endDate.getDate()} ${months[endDate.getMonth()]}`;
        return (
            <h1 className="title">
                { title }
            </h1>
        );
    }

    renderBirthdays() {
        return this.props.personsInfo.map(person => {
            const bday = new Date(person.birthday);
        return <li key={person._id}>{person.firstName} {person.lastName} - {bday.getDate()}.{bday.getMonth()+1} </li>;
        });
    }

    render() {
        return (
            <section className="hero is-medium is-info is-bold">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        { this.renderTitle()}
                        <h1 className="subtitle">{this.props.group.price} den.</h1>
                        <section className="section">
                            <ul>
                                {this.renderBirthdays()}
                            </ul>
                        </section>
                    </div>
                </div>
            </section>
        );
    };
}

export default Group;