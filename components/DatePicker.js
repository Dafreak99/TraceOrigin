import { DatePicker as AntdPicker } from "antd";
import { format } from "date-fns";

import { Controller } from "react-hook-form";
/**
 * Passing control, input name and placeholder to this component
 */

const DatePicker = ({ control, name, placeholder }) => {
  const defaultDate = placeholder ? format(placeholder, "dd/MM/yyyy") : null;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      defaultValue={defaultDate}
      render={({ onChange }) => (
        <AntdPicker
          id="ngayThangNam"
          placeholder={placeholder ? placeholder : "Chọn ngày"}
          onChange={(_, dateString) => onChange(dateString)}
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
// {ngayThangNam: "2020-01-01"} when submitting form
