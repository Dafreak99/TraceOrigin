import { format, formatDistance, subDays } from "date-fns";
const Test = () => {
  //=> "3 days ago"

  return <h3>{format(new Date(), "dd/MM/yyyy")}</h3>;
};

export default Test;
