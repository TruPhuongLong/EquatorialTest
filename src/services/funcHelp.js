import {getCalendars} from './localStorage'

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

// const isShowCalendars = (activeDate) => {
//     const calendars = getCalendars()
//     if (!calendars) return false
//     const _activeDate = calendars.activeDate
//     return isSameDate(activeDate, _activeDate)
// }

export {
    isSameDate,
    calDayOfWeeks,
}