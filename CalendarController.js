// Global variables
let bootstrapColumnWidthMonth = 6;
let year = 2019;
let startDate = new Date(year, 0, 1);
let endDate = new Date(year, 11, 31);

$( document ).ready(function() {
    // Setting up the base view
    let calendarView = new HtmlCalendar(year, new Date());
    calendarView.widthMonth = bootstrapColumnWidthMonth;
    $("#mainRow").html(calendarView.html);

    // Getting contents and adding it to the view
    let Calendar = new CalendarModel("Felleskalendar", "");
    let ICalImport = new ICalHelper();
    Calendar.appointments = ICalImport.getAppointments(startDate, endDate);
    for(let i = 0; i < Calendar.appointments.length; i++) {
        let appointment = Calendar.appointments[i];
        calendarView.setContentRange(appointment.start, appointment.end, CalendarHelper.prefixMapping(appointment.prefix), appointment.title);
    }

    // Scroll to current month
    let $container = $('html');
    let $scrollTo = $('#month-' + (new Date().getMonth()));

    $container.scrollLeft(
        $scrollTo.offset().left - $container.offset().left + $container.scrollLeft()
    );
});