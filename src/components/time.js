import React from 'react'

import {setCalendars, getCalendars} from '../services/localStorage'
import {isSameDate, calDayOfWeeks, isShowCalendars} from '../services/funcHelp'

export default class Time extends React.Component {

    initState = {
        fields: {
            year: (new Date()).getFullYear(),
            month: (new Date().getMonth()),
            activeDate: new Date(),
            dayOfWeeks: [],
            notes: [] //note: [{hour: 0, content: ''}]
        },
        isShowCalendars: false
    }

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',] // 0, 1..., 11
    dayOfWeekTemplate = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] // 1, 2, 3, 4, 5 ,6, 0
    hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

    state = this.initState

    componentDidMount() {
        const activeDate = this.state.fields.activeDate
        const dayOfWeeks = calDayOfWeeks(activeDate)

        // check for show calendar or not:
        const result = isShowCalendars(activeDate)
        console.log('is show calendar: ', result)

        if (result) {
            const calendars = getCalendars()
            console.dir(calendars)
            this.setState({
                fields: calendars,
                isShowCalendars: true
            }, 
                this.fillNoteContent
            )
        } else {
            this.setState(state => ({
                fields: {
                    ...state.fields,
                    dayOfWeeks
                }
            }))
        }
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

    onInputNoteChanged = (hour, event) => {
        const value = event.target.value
        const notes = this.state.fields.notes
        const isShowCalendar = this.state.isShowCalendars

        console.log(hour, value)

        // check hour in note or not:
        const notesHour = notes.map(item => item.hour)
        if (isShowCalendars && notesHour.indexOf(hour) !== -1) {
            // edit child of notes already exists
            console.log('here')
            notes.forEach(item => {
                if (item.hour === hour) {
                    item.content = value
                }
            })
        } else {
            // push new note
            console.log('go here')
            notes.push({ hour, content: value })
        }

        // update state
        this.setState(state => ({
            fields: {
                ...state.fields,
                notes
            }
        }))
    }


    updateState = (activeDate, _dayOfWeeks) => {
        const dayOfWeeks = _dayOfWeeks || this.state.fields.dayOfWeeks
        const _isShowCalendars = isShowCalendars(activeDate)
        console.log(_isShowCalendars)
        this.setState(state => ({
            fields: {
                ...state.fields,
                year: (new Date(activeDate)).getFullYear(),
                month: (new Date(activeDate)).getMonth(),
                activeDate: new Date(activeDate),
                dayOfWeeks
            },
            isShowCalendars: _isShowCalendars
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
        const _dayOfWeeks = calDayOfWeeks(activeDate)

        // check isShowCalendar or not
        const _isShowCalendars = isShowCalendars(activeDate)

        // update state
        this.updateState(activeDate, _dayOfWeeks, _isShowCalendars)
    }

    saveCalendars = () => {
        const calendars = this.state.fields
        setCalendars(calendars)
    }

    

    fillNoteContent = () => {
        const notes = this.state.fields.notes

        notes.forEach(item => {
            if (item.content !== '') {
                this[`input-${item.hour}`].value = item.content
            }
        })
    }

    getNoteContent = (index) => {
        const notes = this.state.fields.notes
        let content = ''

        notes.every(item => {
            console.log(item.hour, item.content)
            if (item.hour === index) {
                content = item.content

            }
        })

        return content
    }

    render() {
        const { year, month, activeDate, dayOfWeeks, notes } = this.state.fields
        const {isShowCalendars} = this.state
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
                                <button onClick={() => this.updateDayOfWeeks('-')} className="btn"><i className="fas fa-angle-left"></i></button>
                            </td>
                            {
                                dayOfWeeks.map((date, index) => {
                                    return (
                                        <td
                                            key={index}
                                            className={`${isSameDate(date, new Date()) ? "current-date" : (isSameDate(date, activeDate) ? "date-active" : null)} pointer`}
                                            onClick={() => this.updateState(date)}>
                                            {(new Date(date)).getDate()}
                                        </td>
                                    )
                                })
                            }
                            <td>
                                <button onClick={() => this.updateDayOfWeeks('+')} className="btn"><i className="fas fa-angle-right"></i></button>
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => this.onInputNoteChanged(index, event)}
                                            ref={input => this[`input-${index}`] = input} 
                                            value={this.getNoteContent(index)}/>
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

