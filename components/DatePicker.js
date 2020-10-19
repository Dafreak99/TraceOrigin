import { format } from "date-fns";
import { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

/**
 * To use this component please pass in [selectedDate, setSelectedDate].
 * const [selectedDate, setSelectedDate] = useState(format(new Date(), FORMAT));
 */

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const FORMAT = "dd/MM/yyyy";

  const handleDayChange = (selectedDay) => {
    setSelectedDate(format(selectedDay, FORMAT));
  };

  return (
    <DayPickerInput
      name="abc"
      format={FORMAT}
      value={selectedDate}
      selectedDay={selectedDate}
      onDayChange={handleDayChange}
    />
  );
};

export default DatePicker;
