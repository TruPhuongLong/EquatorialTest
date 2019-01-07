// const setCalendars = (calendars) => {
//     localStorage.setItem('calendars', JSON.stringify(calendars))
// }

const setCalendars = (calendar) => {

    // check calendar empty:
    let isEmpty = true
    const {notes} = calendar
    notes.forEach(note => {
        //note have shape: { hour: 0, content: '' }
        const {hour, content} = note
        if(content){
            isEmpty = false
        }
    })
    if (isEmpty) return

    const calendars = getCalendars() || []   
    let isEdit = false

    for(let i = 0; i < calendars.length; i++){
        // if edit one calendar already exists
        const oldKey = Object.keys(calendars[i])[0]
        const newKey = Object.keys(calendar)[0]
        if(oldKey === newKey){
            isEdit = true
            calendars[i] = {[oldKey]: calendar[newKey]}
            break
        }
    }

    if(!isEdit){
        // mean isEdit = false, mean create new
        const key = `${calendar.year}-${calendar.month}-${calendar.date}`
        calendars.push({[key]: calendar})
    }
   
    localStorage.setItem('calendars', JSON.stringify(calendars))
}

const getCalendars = () => {
    const calendarsString = localStorage.getItem('calendars')
    // if(!calendarsString) return null
    const calendars = JSON.parse(calendarsString)
    return calendars
}

export {
    getCalendars,
    setCalendars
}