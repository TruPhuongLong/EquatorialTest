import { getCalendars } from './localStorage'

const isSameDate = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

// return array of days in one week, input is type Date.
const calDayOfWeeks = (startDate) => {
    const currentDay = startDate.getDay()

    //get startDate: monday
    if (currentDay === 0) {
        startDate.setDate(startDate.getDate() - 6);
    } else {
        startDate.setDate(startDate.getDate() - currentDay + 1);
    }

    // return array
    let arrayDates = []
    for (let i = 0; i <= 6; i++) {
        const copyStartDate = new Date(startDate)
        const d = new Date(copyStartDate.setDate(copyStartDate.getDate() + i))
        arrayDates.push(d)
    }

    return arrayDates;
}

//get calendar for today and next n day for set timer:
const getCalendarForNextNDays = (n) => {
    // get calendars from localStorage
    const calendars = getCalendars()
    const calendarForTimers = []

    // get date: time = now + n => for calculate timer
    const dateForTimer = new Date()
    dateForTimer.setDate(dateForTimer.getDate() + n) // increment dateForTimer n days. 

    if (calendars && calendars.length >= 0) {
        calendars.forEach(calendar => {
            // calendar have shape: {'2018-01-02': {year: ..., month: ....}}
            const { year, month, date } = Object.values(calendar)[0]
            const calendarDate = new Date(year, month, date)
            if (calendarDate <= dateForTimer) {
                calendarForTimers.push(calendar)
            }
        })
    }

    return calendarForTimers
}

const getEvents = (calendars) => {
    const events = []
    calendars.forEach(calendar => {
        const { year, month, date, notes } = Object.values(calendar)[0]
        notes.forEach(note => {
            //note have shape: { hour: 0, content: '' }
            const { hour, content } = note
            if (content) {
                const event = {
                    time: new Date(year, month, date, hour),
                    message: content
                }
                events.push(event)
            }
        })
    })
    return events
}

//timer: input _calendarForTimers is array of calendar, will callback when time reach :input minutes
const startTimer = (minutes, cb) => {
    // get calendar timer for today and next 2 days
    const calendarForTimers = getCalendarForNextNDays(2)
    if (!calendarForTimers || calendarForTimers.length <= 0) return null

    // get all events in this calendarForTimers: 
    const events = getEvents(calendarForTimers)
    if (events.length <= 0) return null

    let arrayOfTimer = []
    let now = new Date()

    events.forEach(event => {
        const eventTime = event.time
        now.setMinutes(now.getMinutes() + minutes);
        console.log(now)
        const delta = (eventTime.getTime() - now.getTime())  // delta in miliseconds
        console.log('will notify after: ', delta / 1000, ' seconds')
        if (delta > 0) {
            const idTimer = setTimeout(() => cb(event), delta)
            arrayOfTimer.push(idTimer)
        }
    })
    return arrayOfTimer
}

// input date => get activeCalendar or not
const getActiveCalendarWithDate = (inputDate) => {
    // inputDate can be type: Date or pass state is ok too.
    if (!(inputDate instanceof Date)) {
        const { year, month, date } = inputDate
        inputDate = new Date(year, month, date)
    }

    // get array calendars from localStorage
    const calendars = getCalendars()
    let activeCalendar = null

    if (calendars && calendars.length >= 0) {
        calendars.forEach(calendar => {
            const { year, month, date } = Object.values(calendar)[0]
            const calendarDate = new Date(year, month, date)
            if (isSameDate(inputDate, calendarDate)) {
                activeCalendar = calendar
            }
        })
    }
    console.log('=== activeCalendar: ', activeCalendar)

    return activeCalendar
}

const copyArray = (arr) => {
    return JSON.parse(JSON.stringify(arr))
}

export {
    isSameDate,
    calDayOfWeeks,
    startTimer,
    getActiveCalendarWithDate,
    getEvents,
    copyArray
}