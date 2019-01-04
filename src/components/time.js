import React from 'react'

export default class Time extends React.Component {

    state = {
        fields: {
            year: (new Date()).getFullYear(),
            month: (new Date().getMonth()),
            date: (new Date().getDate()),
            dayOfWeeks: [],
            hour: 0
        },
    }

    componentDidMount() {
        const dayOfWeeks = this.calDayOfWeeks(new Date())
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

    isCurrentDate = (date) => {
        const currentDate = new Date()
        const inputDate = new Date(date)
        return currentDate.getFullYear() === inputDate.getFullYear() && currentDate.getMonth() === inputDate.getMonth() && currentDate.getDate() === inputDate.getDate()
    }

    updateDate = (symbol) => {
        console.log(symbol)
    }

    render() {
        const { year, month, date, dayOfWeeks, hour } = this.state.fields
        console.log(date, hour)
        console.log(dayOfWeeks)
        return (
            <div>
                <div className="flex-horizontal">
                    <select onChange={this.onInputChanged} value={month} name="month">
                        {
                            this.months.map((item, index) => <option value={index} key={index}>{item}</option>)
                        }
                    </select>
                    <input type="number" value={year} onChange={this.onInputChanged} name="year" />

                </div>

                <table>
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
                                <button onClick={() => this.updateDate('-')}><i className="fas fa-angle-left"></i></button>
                            </td>
                            {
                                dayOfWeeks.map((date, index) => {
                                    return <td key={index} className={this.isCurrentDate(date) ? "dayActive" : null}>{(new Date(date)).getDate()}</td>
                                })
                            }
                            <td>
                                <button onClick={() => this.updateDate('+')}><i className="fas fa-angle-right"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        {
                            this.hours.map((item, index) => <tr key={index}>{item}</tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
