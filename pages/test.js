import DatePicker from "@/components/DatePicker";
import { useForm } from "react-hook-form";

const Test = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (values) => console.log(values);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DatePicker control={control} />

      <button>Submit</button>
    </form>
  );
};
// console.log(format(parseISO("2020-12-10"), "MM-dd-yyyy"));
// When comparing 2 date with ISO format use new key word
// console.log(
//   isAfter(new Date(dateString), new Date("2020-01-01"))
// );
export default Test;
