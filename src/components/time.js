import React from 'react'

import { setCalendars, getCalendars } from '../services/localStorage'
import { isSameDate, calDayOfWeeks, startTimer, getActiveCalendarWithDate } from '../services/funcHelp'

export default class Time extends React.Component {

    // CONST
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',] // 0, 1..., 11
    dayOfWeekTemplate = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] // 1, 2, 3, 4, 5 ,6, 0
    notes = [
        { hour: 0, content: '' },
        { hour: 1, content: '' },
        { hour: 2, content: '' },
        { hour: 3, content: '' },
        { hour: 4, content: '' },
        { hour: 5, content: '' },
        { hour: 6, content: '' },
        { hour: 7, content: '' },
        { hour: 8, content: '' },
        { hour: 9, content: '' },
        { hour: 10, content: '' },
        { hour: 11, content: '' },
        { hour: 12, content: '' },
        { hour: 13, content: '' },
        { hour: 14, content: '' },
        { hour: 15, content: '' },
        { hour: 16, content: '' },
        { hour: 17, content: '' },
        { hour: 18, content: '' },
        { hour: 19, content: '' },
        { hour: 20, content: '' },
        { hour: 21, content: '' },
        { hour: 22, content: '' },
        { hour: 23, content: '' },
    ]

    // init state
    initState = (date, _notes) => ({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        dayOfWeeks: calDayOfWeeks(date),
        notes: _notes || this.notes //note: [{hour: 0, content: ''}, ...]

    })



    

    constructor(props) {
        super(props)

        // check today is contain calendar or not
        let activeCalendar = getActiveCalendarWithDate(new Date())
        if (activeCalendar) {
            this.state = Object.values(activeCalendar)[0]
        } else {
            this.state = this.initState(new Date())
        }

        this.idTimer = startTimer(60, this.notification)
    }

    componentWillUnmount(){
        clearTimeout(this.idTimer)
    }

    // update value when change: month, year
    onInputChanged = (event) => {
        const name = event.target.name
        const value = event.target.value

        const newState = { ...this.state, [name]: value }
        console.log(newState)

        this.updateState(newState, name)
    }

    // call when typping input note
    onInputNoteChanged = (index, event) => {
        const notes = this.state.notes
        const value = event.target.value

        for(let i = 0; i < notes.length; i++){
            if(notes[i].hour === index){
                notes[i].content = value
                break
            }   
        }

        this.setState({
            notes
        })
    }

    // click to each date (1-31) or arrow previus or next : will trigger this func
    onDateChange = (_date) => {
        let newState
        if (_date instanceof Date) {
            newState = { ...this.state, year: _date.getFullYear(), month: _date.getMonth(), date: _date.getDate() }

        } else {
            const { year, month, date } = this.state
            const newDate = new Date(year, month, date)
            if (_date === '-') {
                newDate.setDate(newDate.getDate() - 7)
            } else {
                newDate.setDate(newDate.getDate() + 7)
            }
            console.log('newDate ', newDate)

            newState = { ...this.state, year: newDate.getFullYear(), month: newDate.getMonth(), date: newDate.getDate() }
            console.log('new State ', newState)
        }

        this.updateState(newState, 'date')
    }

    // update new state when change activeDate
    updateState = (newState, keyChange) => {
        // check today is contain calendar or not
        const { year, month, date } = newState
        const currentDate = new Date(year, month, date)
        let activeCalendar = getActiveCalendarWithDate(currentDate)

        if (activeCalendar) {
            newState = Object.values(activeCalendar)[0]
        } else {
            // if change month, we need reset range dayOfWeek, each month have difference number of days.
            if (keyChange === 'month') {
                newState.date = 1 //reset to first day of month
            }

            newState.dayOfWeeks = calDayOfWeeks(currentDate)
            newState.notes = this.notes
        }

        this.setState(newState)
    }

    // save calendar.
    saveCalendars = () => {
        const calendar = this.state
        setCalendars(calendar)
    }

    // notification: event have shape: {time: .., message: ''}
    notification = ({time, message}) => {
        window.alert( `calendar: ${message}`)
    }


    


    render() {
        const { year, month, date, dayOfWeeks, notes } = this.state
        console.log('dayOfWeeks ', dayOfWeeks)
        return (
            <div>
                <div className="flex-horizontal">
                    <select onChange={this.onInputChanged} value={month} name="month">
                        {
                            this.months.map((item, index) => <option value={index} key={index} className="form-control">{item}</option>)
                        }
                    </select>
                    <input type="number" value={year} onChange={this.onInputChanged} name="year" className="form-control" />
                    <button className="btn btn-success" onClick={this.saveCalendars}>Save</button>
                </div>

                <table style={{ textAlign: 'center' }}>
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
                                <button onClick={() => this.onDateChange('-')} className="btn"><i className="fas fa-angle-left"></i></button>
                            </td>
                            {
                                dayOfWeeks.map((dayOfWeek, index) => {
                                    return (
                                        <td
                                            key={index}
                                            className={`${isSameDate((new Date(dayOfWeek)), new Date(year, month, date)) ? "date-active" : null} pointer`}
                                            onClick={() => this.onDateChange((new Date(dayOfWeek)))}
                                        >
                                            {(new Date(dayOfWeek)).getDate()}
                                        </td>
                                    )
                                })
                            }
                            <td>
                                <button onClick={() => this.onDateChange('+')} className="btn"><i className="fas fa-angle-right"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        {
                            notes.map(({ hour, content }, index) => (
                                <tr key={index} className="tr-hover" >
                                    <td>
                                        {hour}
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => this.onInputNoteChanged(index, event)}
                                            value={content}
                                        />
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

