import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
const locales = {
  vi: require("date-fns/locale/vi"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const date = format(new Date("03/04/2021"), "MM/dd/yyyy");
console.log(date);
const myEventsList = [
  // {
  //   title: "event 1",
  //   start: "04/04/2021",
  //   end: "04/04/2021",
  //   allDay: true,
  //   resource: "abc",
  // },
  {
    title: "event 2",
    start: date,
    end: "02/04/2021",
    allDay: true,
    resource: "abc",
  },
];

const MyCalendar = (props) => (
  <div>
    <Calendar
      onSelectEvent={(e) => console.log(e)}
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
