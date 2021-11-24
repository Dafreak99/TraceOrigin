import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  List,
  ListItem,
  Text,
  Image,
} from "@chakra-ui/react";
import { Timeline } from "antd";

const DiaryTimeline = ({
  data: { feeding, usingMedicine, pondEnvironment, dailyNote, replaceWater },
}) => {
  const dairies = [
    { title: "Cho ăn", component: <Feeding data={feeding} /> },
    { title: "Sử dụng thuốc", component: <Medicine data={usingMedicine} /> },
    { title: "Ghi chép hằng ngày", component: <Note data={dailyNote} /> },
    {
      title: "Môi trường ao",
      component: <Environment data={pondEnvironment} />,
    },
    {
      title: "Thay nước",
      component: <ReplaceWater data={replaceWater} />,
    },
  ];

  return (
    <Accordion allowToggle>
      {dairies.map(({ title, component }) => (
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{component}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const Feeding = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((each) => (
          <Timeline>
            <Timeline.Item>
              <List spacing={3} mt={4}>
                <ListItem>
                  <Text fontWeight="bold">
                    Ngày ghi nhận:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.createdDate}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Ghi chú:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.note}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Khối lượng cho ăn:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.weight}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Tên thức ăn:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.food.name}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Hình ảnh: <Image src={each.food.images[0]} h="100px" />
                  </Text>
                </ListItem>
              </List>
            </Timeline.Item>
          </Timeline>
        ))
      ) : (
        <Text>Không có ghi nhận</Text>
      )}
    </>
  );
};

const Medicine = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((each) => (
          <Timeline>
            <Timeline.Item>
              <List spacing={3} mt={4}>
                <ListItem>
                  <Text fontWeight="bold">
                    Ngày ghi nhận:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.createdDate}
                    </Text>
                  </Text>
                </ListItem>

                <ListItem>
                  <Text fontWeight="bold">
                    Khối lượng sử dụng:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.weight}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Tên thuốc:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.medicine.name}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Hình ảnh: <Image src={each.medicine.images[0]} h="100px" />
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Tỉ lệ trộn với thức ăn:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.mixingRatio} %
                    </Text>
                  </Text>
                </ListItem>
              </List>
            </Timeline.Item>
          </Timeline>
        ))
      ) : (
        <Text>Không có ghi nhận</Text>
      )}
    </>
  );
};

const Note = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((each) => (
          <Timeline>
            <Timeline.Item>
              <List spacing={3} mt={4}>
                <ListItem>
                  <Text fontWeight="bold">
                    Ngày ghi nhận:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.createdDate}
                    </Text>
                  </Text>
                </ListItem>

                <ListItem>
                  <Text fontWeight="bold">
                    Ghi chú:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.note}
                    </Text>
                  </Text>
                </ListItem>
                {each.images.length > 0 && (
                  <ListItem>
                    <Text fontWeight="bold">
                      Hình ảnh:{" "}
                      <Image src={each.medicine.images[0]} h="100px" />
                    </Text>
                  </ListItem>
                )}
              </List>
            </Timeline.Item>
          </Timeline>
        ))
      ) : (
        <Text>Không có ghi nhận</Text>
      )}
    </>
  );
};

const Environment = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map(
          ({
            H2S,
            NH3,
            alkalinity,
            clarity,
            createdDate,
            oxy,
            ph,
            salinity,
          }) => (
            <Timeline>
              <Timeline.Item>
                <List spacing={3} mt={4}>
                  <ListItem>
                    <Text fontWeight="bold">
                      Ngày ghi nhận:{" "}
                      <Text as="span" fontWeight="normal">
                        {createdDate}
                      </Text>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">
                      Oxy:{" "}
                      <Text as="span" fontWeight="normal">
                        {oxy} (mg/l)
                      </Text>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">
                      PH:{" "}
                      <Text as="span" fontWeight="normal">
                        {ph}
                      </Text>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">
                      Độ trong:{" "}
                      <Text as="span" fontWeight="normal">
                        {clarity} (mg/l)
                      </Text>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">
                      Độ mặn:{" "}
                      <Text as="span" fontWeight="normal">
                        {salinity} (mg/l)
                      </Text>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">
                      H2S:{" "}
                      <Text as="span" fontWeight="normal">
                        {H2S} (mg/l)
                      </Text>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">
                      NH3:{" "}
                      <Text as="span" fontWeight="normal">
                        {NH3} (mg/l)
                      </Text>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">
                      Độ kiềm:{" "}
                      <Text as="span" fontWeight="normal">
                        {alkalinity} (mg/l)
                      </Text>
                    </Text>
                  </ListItem>
                </List>
              </Timeline.Item>
            </Timeline>
          )
        )
      ) : (
        <Text>Không có ghi nhận</Text>
      )}
    </>
  );
};

const ReplaceWater = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((each) => (
          <Timeline>
            <Timeline.Item>
              <List spacing={3} mt={4}>
                <ListItem>
                  <Text fontWeight="bold">
                    Ngày thay nước:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.createdDate}
                    </Text>
                  </Text>
                </ListItem>

                <ListItem>
                  <Text fontWeight="bold">
                    Lượng nước:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.percentage}% ao
                    </Text>
                  </Text>
                </ListItem>
              </List>
            </Timeline.Item>
          </Timeline>
        ))
      ) : (
        <Text>Không có ghi nhận</Text>
      )}
    </>
  );
};

export default DiaryTimeline;
