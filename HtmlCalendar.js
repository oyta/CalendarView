class HtmlCalendar {
    _year;
    _currentDate;

    _widthMonth = 2;

    constructor(year, currentDate = new Date()) {
        this._year = year;
        this._currentDate = currentDate;
    }
    
    /**
     * @param {(arg0: number) => void} widthMonth
     */
    set widthMonth (widthMonth) {
        this._widthMonth = widthMonth;
    }

    get html() {
        let html = "";
        html += this.htmlYear(this._year);

        return html;
    }

    htmlYear(year) {
        let returnHtml = "";
        for(let i = 1; i < 13; i++) {
            returnHtml += this.htmlMonth(year, i, this._widthMonth);
        }
        return returnHtml;
    }
    
    htmlMonth(year, month, width) {
        let returnHtml = "<div class='col-" + width + "' id='month-" + month + "'><div class='row border ml-1'>";
        returnHtml += "<div class='col-12 header-month'><h4 class='p-2 pt-3 text-center'>" + CalendarHelper.nameOfMonth( month ) + "</h4></div>";    
        for(let i = 1; i <= CalendarHelper.daysInMonth(year, month); i++) {
            let calenderDate = new Date(year,month-1,i);
            let dayOfWeek = calenderDate.getDay();
            let cssClass = CalendarHelper.colorOfDay(calenderDate);
            let dayOfYear = CalendarHelper.dayOfYear(calenderDate);
    
            returnHtml += "<div class='col-12'><div class='row'>";
            returnHtml += "<div class='col-2 my-2 " + cssClass + "'>" + CalendarHelper.nameOfDay(dayOfWeek) + " <span class='date-text'>" + i + "</span></div>";
            returnHtml += "<div class='col-auto my-2 " + cssClass + "' >&nbsp;</div>";
            returnHtml += "<div id='" + dayOfYear + "-1' class='col-1 my-2 " + cssClass + "' >&nbsp;</div>";
            returnHtml += "<div id='" + dayOfYear + "-2' class='col-1 my-2 " + cssClass + "'>&nbsp;</div>";
            returnHtml += "<div id='" + dayOfYear + "-3' class='col-1 my-2 " + cssClass + "'>&nbsp;</div>";
            returnHtml += "<div id='" + dayOfYear + "-4' class='col-1 my-2 " + cssClass + "'>&nbsp;</div>";
            returnHtml += "<div id='" + dayOfYear + "-5' class='col  my-2 " + cssClass + "'>&nbsp;</div>";
            returnHtml += "</div></div>";
        }
        returnHtml += "</div></div>";
    
        return returnHtml;
    }

    setContentDay(dayOfYear, column, type) {
        let selector = "#" + dayOfYear + "-" + column;

        $(selector).addClass(type);
        $(selector).addClass("column-" + column);
        $(selector).removeClass("my-2");
    }

    setContentRange(fromDate, toDate, column, cal_text) {
        let fromDayOfYear = CalendarHelper.dayOfYear(fromDate);
        let toDayOfYear = CalendarHelper.dayOfYear(toDate);
        let fromSelector = "#" + fromDayOfYear + "-" + column;
        let $element = $("<div>", {
            "class": "calendar-text",
            "data-toggle": "tooltip",
            "data-placement": "right",
            "title": cal_text
        });
        $element.tooltip('enable');
        $element.text(cal_text);
        $(fromSelector).parent().append($element);

        if( toDayOfYear - fromDayOfYear > 0 ) {
            this.setContentDay(fromDayOfYear, column, "start");
            for( let i = fromDayOfYear+1; i < toDayOfYear; i++ ) {
                this.setContentDay(i, column, "fullDay");
            }
            this.setContentDay(toDayOfYear, column, "stop");
        }
        else {
            this.setContentDay(fromDayOfYear, column, "oneDay");
        }

        // New position calculation
        // Left offset
        let fromBoxPosition = $(fromSelector).position();
        let fromBoxWidth = $(fromSelector).outerWidth();
        let textBoxPosition = $element.position();
        let textBoxHeight = $element.outerHeight();
        let moveLeft = fromBoxPosition.left + fromBoxWidth/2 - textBoxPosition.left - textBoxHeight/2; 

        // Width of textbox
        let fromBoxHeight = $(fromSelector).outerHeight();
        let numberOfDays = toDayOfYear - fromDayOfYear + 1;
        numberOfDays = numberOfDays <= 0 ? 1 : numberOfDays;
        let textBoxWidth = fromBoxHeight * numberOfDays;
        $element.attr("style", "left: " + moveLeft + "px; width: " + textBoxWidth + "px;");
        // End position calculation
    }
}