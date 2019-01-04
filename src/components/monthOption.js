import React from 'react'

import Field from './core/field'

export default class MonthOption extends React.Component {

    state = {
        fields: {
            month: 0,
            year: 2018,
        },
        fieldErrors: {}
    }

    resetState = () => {
        this.setState({
            fields: {
                email: 2018,
            },
            fieldErrors: {}
        })
    }

    onInputChanged = ({ name, value, errors }) => {
        const { fields, fieldErrors } = this.state;
        fields[name] = value;
        if (errors) {
            fieldErrors[name] = errors;
        } else {
            delete fieldErrors[name];
        }
        this.setState({ fields, fieldErrors })
    }

    render() {
        const {year} = this.state.fields
        return (
            <div>
                <select onChange={this.onInputChanged}>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>
                <Field type="number"
                    name="year"
                    value={year}
                    onChange={this.onInputChanged}
                />
            </div>
        )
    }
}
