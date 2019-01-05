const setCalendars = (calendars) => {
    localStorage.setItem('calendars', JSON.stringify(calendars))
}

const getCalendars = () => {
    const calendarsString = localStorage.getItem('calendars')
    const calendars = JSON.parse(calendarsString)
    return calendars
}

export {
    setCalendars,
    getCalendars
}