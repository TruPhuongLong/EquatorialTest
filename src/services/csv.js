import {getCalendars} from './localStorage'
import {getEvents} from './funcHelp'

function convertArrayOfObjectsToCSV(events) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter

    if (events == null || !events.length) {
        return null;
    }

    columnDelimiter = ' , ';
    lineDelimiter = '\r\n';

    keys = Object.keys(events[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    console.log(events)

    events.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}


function downloadCSV(args) {
    const calendars = getCalendars()
    console.log('calendars ', calendars)

    if(!calendars || calendars.length <= 0) return
    const events = getEvents(calendars) 
    console.log(events)

    let csv = convertArrayOfObjectsToCSV(events);
    if (csv == null) return;
    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }

    console.log('go', csv)

    const filename = args.filename || 'export.csv';

    const data = encodeURI(csv);

    console.log('data encodeURI', data)

    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

export {
    downloadCSV
}