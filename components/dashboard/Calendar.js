import { Calendar as RBCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { Box, Flex, Image, List, ListItem, Text } from "@chakra-ui/react";
import { Modal } from "antd";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calendar = ({ data }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (data !== undefined) {
      const myEventsList = data.map(({ note, createdDate, ...rest }) => ({
        title: note,
        start: convertDate(createdDate),
        end: convertDate(createdDate),
        allDay: true,
        source: "abc",
        ...rest,
      }));

      setEvents(myEventsList);
    }
  }, [data]);

  function convertDate(dateStr) {
    // Custom convert from dd/mm/yyyy into mm/dd/yyyy
    let [date, month, year] = dateStr.split("/");
    return [month, date, year].join("/");
  }

  const toolbar = ({ onNavigate, label }) => {
    return (
      <Flex className="rbc-toolbar" p="2rem 0" flexDirection="column-reverse">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate("TODAY")}>
            today
          </button>
          <button type="button" onClick={() => onNavigate("PREV")}>
            back
          </button>
          <button type="button" onClick={() => onNavigate("NEXT")}>
            next
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
      </Flex>
    );
  };

  console.log(selectedEvent);

  return (
    <>
      <RBCalendar
        localizer={localizer}
        events={events}
        onSelectEvent={(e) => {
          setSelectedEvent(e);
          setVisible(true);
        }}
        startAccessor="start"
        view="month"
        views={["month"]}
        endAccessor="end"
        style={{ height: "100%" }}
        popup
        //   toolbar={false}

        components={{ toolbar }}
      />
      {selectedEvent && (
        <Modal
          title="Nhật ký cho ăn"
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <List spacing={3}>
            <ListItem>
              <Text fontSize="md" fontWeight="bold">
                Tên ao:{" "}
                <Box as="span" fontWeight="normal">
                  {selectedEvent.pond.name}
                </Box>
              </Text>
            </ListItem>

            <ListItem>
              <Text fontSize="md" fontWeight="bold">
                Ghi chú:{" "}
                <Box as="span" fontWeight="normal">
                  {selectedEvent.title}
                </Box>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="md" fontWeight="bold">
                Ngày cho ăn:{" "}
                <Box as="span" fontWeight="normal">
                  {selectedEvent.start}
                </Box>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="md" fontWeight="bold">
                Thức ăn:{" "}
                <Box as="span" fontWeight="normal">
                  {selectedEvent.food.name}
                </Box>
              </Text>
            </ListItem>
            <ListItem>
              <Image src={selectedEvent.food.images[0]} height="150px" />
            </ListItem>
          </List>
        </Modal>
      )}
    </>
  );
};

export default Calendar;
