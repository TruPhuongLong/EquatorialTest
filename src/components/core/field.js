import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Field extends Component {

    static propTypes = {
        type: PropTypes.string,
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validates: PropTypes.arrayOf(PropTypes.func),
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    static propDefault = {
        type: 'text'
    }

    state = {
        value: this.props.value,
        errors: []
    }

    touched = false;

    componentWillReceiveProps(update) {
        this.setState({ value: update.value });
    }

    componentDidMount(){
         // for parent get errors if exist at first render:
         this.update(this.state.value);
    }

    _onChange = (event) => {
        this.touched = true;
        this.update(event.target.value);
    }

    update(value){
        const { name, validates, onChange } = this.props;
        let errors = validates && validates.length ? validates.map(validate => validate(value)) : false;
        // if errors is array : [null, null, ...] => we set errors = false;
        if(errors && errors.length && !errors.filter(error => error).length) errors = false;
        this.setState({ value, errors });
        onChange({ name, value, errors });
    }

    render() {
        const { type, placeholder, name, className } = this.props;
        const { value, errors } = this.state;
        return (
            <div style={{textAlign: 'start'}}>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className={className}
                    value={value}
                    onChange={this._onChange}
                />
                {
                    errors && errors.length && this.touched ?
                        errors.map((error, index) => 
                            <p key={index} style={{ color: 'red' }}>{error}</p>
                        ) :
                        null
                }
            </div>
        )
    }
}