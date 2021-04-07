import { DatePicker as AntdPicker } from "antd";
import { Controller } from "react-hook-form";
import moment from "moment";
/**
 * Passing control, input name and placeholder to this component
 */

const DatePicker = ({ control, name, placeholder }) => {
  const defaultDate = placeholder
    ? placeholder
    : moment().format("DD/MM/YYYY, h:mm a");

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      defaultValue={defaultDate}
      render={({ onChange }) => (
        <AntdPicker
          id="createdDate"
          placeholder={
            placeholder ? placeholder : moment().format("DD/MM/YYYY")
          }
          onChange={(momentObj) =>
            onChange(momentObj.format("DD/MM/YYYY, h:mm a"))
          }
          format="DD/MM/YYYY"
        />
      )}
    />
  );
};

export default DatePicker;

// Để submit đc thì trong defaultValue của <Controller/> phải có giá trị

// 1. Chọn ngày -> defaultValue={null} để hiển thị lỗi khi chưa chọn ngày
// 2. Có ngày sẵn hiển thị ra as default

// console.log(format(parseISO("2020-12-10"), "MM-dd-yyyy"));
// When comparing 2 date with ISO format use new key word
// console.log(
//   isAfter(new Date(dateString), new Date("2020-01-01"))
// );

// Wrapped inside controller to retain the name attribute
// {createdDate: "2020-01-01"} when submitting form
