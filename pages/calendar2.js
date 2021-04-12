import dynamic from "next/dynamic";
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

const Calendar = dynamic(() => import("tui-calendar"));
const Calendar2 = () => {
  var cal = new Calendar("#calendar", {
    defaultView: "month", // monthly view option
  });

  return (
    <>
      <div id="menu">
        <span id="menu-navi">
          <button
            type="button"
            class="btn btn-default btn-sm move-today"
            data-action="move-today"
          >
            Today
          </button>
          <button
            type="button"
            class="btn btn-default btn-sm move-day"
            data-action="move-prev"
          >
            <i
              class="calendar-icon ic-arrow-line-left"
              data-action="move-prev"
            ></i>
          </button>
          <button
            type="button"
            class="btn btn-default btn-sm move-day"
            data-action="move-next"
          >
            <i
              class="calendar-icon ic-arrow-line-right"
              data-action="move-next"
            ></i>
          </button>
        </span>
        <span id="renderRange" class="render-range"></span>
      </div>

      <div id="calendar"></div>
    </>
  );
};

export default Calendar2;
