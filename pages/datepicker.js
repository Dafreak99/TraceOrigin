import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "@/components/DatePicker";

const DatePickerPage = () => {
  const FORMAT = "dd/MM/yyyy";
  const [selectedDate, setSelectedDate] = useState(format(new Date(), FORMAT));
  const { handleSubmit, register, errors } = useForm();

  // TODO: How to export state for common usage
  const onSubmit = (values) => {
    console.log(values);
    console.log(selectedDate);
  };
  return (
    <>
      <h3>DayPickerInput</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="name"
          ref={register({
            required: "Required",
          })}
        />
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <button>Send</button>
      </form>
    </>
  );
};

export default DatePickerPage;
