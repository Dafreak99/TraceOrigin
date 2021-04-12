import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import "moment/locale/vi";
import { Flex } from "@chakra-ui/core";
import Calendar from "@/components/dashboard/Calendar";

const MyCalendar = (props) => {
  const { data, error } = useSWR(
    [
      `/api/feedingdiary/true||*`,
      process.browser ? localStorage.getItem("token") : null,
      ,
    ],
    fetcher
  );

  return (
    <Flex
      h="100vh"
      w="100vw"
      justify="center"
      align="center"
      background="#f3f3f3"
    >
      <Calendar data={data} />
    </Flex>
  );
};

export default MyCalendar;
