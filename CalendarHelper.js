class CalendarHelper {
    static  colorOfDay(calendarDate) {
        let cssClass = "weekday";
        let today = new Date();
        let isToday = 
            calendarDate.getFullYear() === today.getFullYear() &&
            calendarDate.getMonth() === today.getMonth() &&
            calendarDate.getDate()  === today.getDate();
        let dayOfWeek = calendarDate.getDay();
        let dayCssClass = [
            "sunday",
            "weekday","weekday","weekday","weekday","weekday",
            "saturday"
        ];
        cssClass = isToday ? "today" : dayCssClass[dayOfWeek];

        return cssClass;
    }

    static daysInMonth (year, month) {
        return new Date(year, month, 0).getDate();
    }
    
    static nameOfMonth(month) {
        let name = "undefined";
        let names = ["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"];
        name = names[month-1];
    
        return name;
    }
    
    static nameOfDay(dayOfWeek) {
        let name = "undefined";
        let names = ['S','M','T','O','T','F','L'];
        name = names[dayOfWeek];
    
        return name;
    }

    static dayOfYear(date) {
        let dayOfYear = 1;
        let year = date.getFullYear();
        let utcDate = Date.UTC( year, date.getMonth(), date.getDate());
        let firstDay = Date.UTC( year, 0, 1);
        let oneDayMs = 1000*60*60*24;
        dayOfYear = Math.round((utcDate-firstDay)/oneDayMs) + 1;

        return dayOfYear;
    }

    static prefixMapping(prefix) {
        let columnNumber = 1;
        switch(prefix) {
            case "Ø":
                columnNumber = 1;
                break;
            case "K":
                columnNumber = 2;
                break;
            case "L":
                columnNumber = 3;
                break;
            default:
                columnNumber = 4;
                break;
        }
        
        return columnNumber;
    }
}