function c(s) {
    //console.log(s);
}

class ICalHelper {
    
    downloadCalendar(url) {
        let content = "";
        content = this._v;

        return content;
    }

    getAppointments(fromDate, toDate) {
        let appointments = new Array();
        let lines = this._v.split("\n"); 
        let foundAppointment = false;
        let outsideDateScope = false;
        let separator = ":";
        let startDate, endDate, summary, description, prefix;
        fromDate.setHours(0,0,0,0);
        toDate.setHours(0,0,0,0);

        for(let i = 0; i < lines.length; i++) {
            let separatorIndex = lines[i].indexOf(separator);
            let key = lines[i].substring(0, separatorIndex);
            let value = lines[i].substring(separatorIndex+1);
            key = key.trim();
            value = value.trim();

            if(key.indexOf(";") > 0) {
                let parts = key.split(";");
                key = parts[0];
            }

            if(outsideDateScope) {
                foundAppointment = false;
                outsideDateScope = false;
                startDate = null;
                endDate = null;
                summary = null;
                description = null;
                prefix = null;
            }
            else if( key.trim().localeCompare("BEGIN") === 0 && value.trim().localeCompare("VEVENT") === 0) {
                foundAppointment = true;
                c("_____Start app: " + key);
            } else if( key.localeCompare("END") === 0 && value.localeCompare("VEVENT") === 0) {
                foundAppointment = false;
                if( startDate != null && endDate != null ) {
                    appointments.push(new AppointmentModel(startDate, endDate, summary, description, prefix));
                }
                else {
                   c("*** ERROR ***: Appointment not saved as a date was null. Desc: " + description + ", summ: " + summary);
                }
                startDate = null;
                endDate = null;
                summary = null;
                description = null;
                prefix = null;
                c("_____END app: " + key);
            }

            if(foundAppointment){
                if(key.localeCompare("DTSTART" )=== 0) {
                    // Start date
                    startDate = new Date(value.substring(0, 4), value.substring(4,6) - 1, value.substring(6,8));
                    startDate.setHours(0,0,0,0);
                    if(startDate.getTime() < fromDate.getTime() || startDate.getTime() > toDate.getTime()) {
                        outsideDateScope = true;
                        c("*** INFO *** Start date is outside date scope");
                    }
                    c(startDate);
                }
                else if(key.localeCompare("DTEND")=== 0) {
                    // End date
                    endDate = new Date(value.substring(0, 4), value.substring(4,6) - 1, value.substring(6,8));
                    if( value.length > 6 ) {
                        endDate.setTime(endDate.getTime()-1000*60*60*24);
                    }
                    endDate.setHours(0,0,0,0);
                    if(endDate.getTime() < fromDate.getTime() || endDate > toDate.getTime()) {
                        outsideDateScope = true;
                        c("*** INFO *** End date is outside date scope");
                    }
                    c(endDate);
                }
                else if(key.localeCompare("DESCRIPTION")=== 0) {
                    // Description
                    description = value;
                    c("Desc: " + description);
                }
                else if(key.localeCompare("SUMMARY")=== 0) {
                    // Summary
                    let [newPrefix,newSummary] = value.split(":");
                    if(newSummary != null && newPrefix.length === 1) {
                        prefix = newPrefix;
                        summary = newSummary.trim();
                    }
                    else {
                        summary = newPrefix.trim();
                    }
                    c("Summ: " + summary);
                }
            }
        }

        return appointments;
    }

    _v = "";
}