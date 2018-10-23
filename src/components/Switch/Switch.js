import React, { Component } from 'react';
import './switch.css';

class Switch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked,
            label: props.label,
            id: props.id,
            groupId: props.groupId,
            handlePayed: props.handlePayed
        };
    };

    _handleChange = () => {
        const check = !this.state.checked;

        this.setState({
            checked: check
        });

        this.state.handlePayed({
            personId: this.state.id,
            groupId: this.state.groupId,
            payed: check
        });
    };

    render() {
        const { id, checked, label } = this.state;
        return (
            <div aria-label={label} className="switch">
                <label className="switch__label" htmlFor={id}>
                    <input role="switch" aria-checked={checked} type="checkbox" className="switch__input" id={id} checked={checked} onChange={() => this._handleChange()} />
                    <span className="switch__text" data-on="yes" data-off="no"></span>
                    <span className="switch__handle"></span>
                </label>
            </div>
        );
    }
}

export default Switch;