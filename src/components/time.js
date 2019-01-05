import React from 'react'

export default class Time extends React.Component {

    state = {
        fields: {
            year: (new Date()).getFullYear(),
            month: (new Date().getMonth()),
            activeDate: new Date(),
            dayOfWeeks: [],
            hour: 0
        },
    }

    componentDidMount() {
        const activeDate = this.state.fields.activeDate
        const dayOfWeeks = this.calDayOfWeeks(activeDate)
        this.setState(state => ({
            fields: {
                ...state.fields,
                dayOfWeeks
            }
        }))
    }

    onInputChanged = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState(state => ({
            fields: {
                ...state.fields,
                [name]: value
            }
        }))
    }

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',] // 0, 1..., 11
    dayOfWeekTemplate = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] // 1, 2, 3, 4, 5 ,6, 0
    hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

    // return array of days in one week
    calDayOfWeeks = (date) => {
        let startDate = new Date(date)
        const currentDay = date.getDay()

        //get startDate: monday
        if (currentDay === 0) {
            startDate.setDate(startDate.getDate() - 6);
        } else {
            startDate.setDate(startDate.getDate() - currentDay + 1);
        }

        // return array
        let arrayDates = []
        for (let i = 0; i <= 6; i++) {
            arrayDates.push((new Date(startDate)).setDate(startDate.getDate() + i))
        }

        return arrayDates;
    }

    isSameDate = (date1, date2) => {
        const d1 = new Date(date1)
        const d2 = new Date(date2)
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
    }

    setActiveDate = (activeDate, _dayOfWeeks) => {
        const dayOfWeeks = _dayOfWeeks || this.state.fields.dayOfWeeks
        this.setState(state => ({
            fields: {
                ...state.fields,
                year: (new Date(activeDate)).getFullYear(),
                month: (new Date(activeDate)).getMonth(),
                activeDate: new Date(activeDate),
                dayOfWeeks
            }
        }))
    }

    updateDayOfWeeks = (symbol) => {
        //copy activeDate
        const activeDate = new Date(this.state.fields.activeDate)

        // check symbol
        if (symbol === '-') {
            activeDate.setDate(activeDate.getDate() - 7)
        } else {
            activeDate.setDate(activeDate.getDate() + 7)
        }

        //get range dateOfWeeks:
        console.log(activeDate)
        const dayOfWeeks = this.calDayOfWeeks(activeDate)
        this.setActiveDate(activeDate, dayOfWeeks)
    }

    render() {
        const { year, month, activeDate, dayOfWeeks, hour } = this.state.fields
        console.log(activeDate)
        return (
            <div>
                <div className="flex-horizontal">
                    <select onChange={this.onInputChanged} value={month} name="month">
                        {
                            this.months.map((item, index) => <option value={index} key={index} className="form-control">{item}</option>)
                        }
                    </select>
                    <input type="number" value={year} onChange={this.onInputChanged} name="year" className="form-control" />
                    <button>Save</button>
                </div>

                <table style={{textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th></th>
                            {
                                this.dayOfWeekTemplate.map((item, index) => <th key={index}>{item}</th>)
                            }
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button onClick={() => this.updateDayOfWeeks('-')} className="pointer"><i className="fas fa-angle-left"></i></button>
                            </td>
                            {
                                dayOfWeeks.map((date, index) => {
                                    return (
                                        <td
                                            key={index}
                                            className={`${this.isSameDate(date, new Date()) ? "current-date" : (this.isSameDate(date, activeDate) ? "date-active" : null)} pointer`}
                                            onClick={() => this.setActiveDate(date)}>
                                            {(new Date(date)).getDate()}
                                        </td>
                                    )
                                })
                            }
                            <td>
                                <button onClick={() => this.updateDayOfWeeks('+')} className="pointer"><i className="fas fa-angle-right"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        {
                            this.hours.map((item, index) => (
                                <tr key={index} className="tr-hover" >
                                    <td>
                                        {item}
                                    </td>
                                    <td>
                                        <input type="text" className="form-control"/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
