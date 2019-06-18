class CalendarModel {
    _name;
    _appointments = new Array();
    _url;

    constructor(name, url) {
        this._name = name;
        this._url = url;
    }

    set appointments(appointments) {
        this._appointments = appointments;
    }

    get appointments() {
        return this._appointments;
    }
}

class AppointmentModel {
    _start;
    _end;
    _title;
    _text;
    _prefix;
    
    constructor(start, end, title, text, prefix = "default") {
        this._start = start;
        this._end = end;
        this._title = title;
        this._text = text;
        this._prefix = prefix;
    }

    numberOfDays() {
        let count = 0;
        count = this.endDayOfYear() - this.startDayOfYear();

        return count;
    }

    startDayOfYear() {
        let dayOfYear = 0;
        dayOfYear = CalendarHelper.dayOfYear(this._start);

        return dayOfYear;
    }

    endDayOfYear() {
        let dayOfYear = 0;
        dayOfYear = CalendarHelper.dayOfYear(this._end);

        return dayOfYear;
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

    get title() {
        return this._title;
    }

    get text() {
        return this._text;
    }
    
    get prefix() {
        return this._prefix;
    }
}