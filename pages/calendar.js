import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format, parse } from "date-fns";

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const myEventsList = [
    {
      title: "test",
      start: format(new Date("03/04/2021"), "MM/dd/yyyy"),
      end: format(new Date("03/04/2021"), "MM/dd/yyyy"),
      allDay: true,
      resource: "abc",
    },
  ];

  const dateString = "02-10-21";
  const date = parse(dateString, "MM-dd-yy", new Date());

  console.log(date);

  const dayFormat = (date, culture, localizer) =>
    localizer.format(date, "DDD", culture);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        formats={{ dayFormat }}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
