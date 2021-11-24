import {
  Box,
  List,
  ListItem,
  Text,
  Image,
  Heading,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { Timeline } from "antd";
import GreenDot from "./GreenDot";

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
    <Box
      bg="#fff"
      borderRadius="10px"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
      boxShadow="0 2px 4px rgb(57 70 106 / 10%)"
    >
      <Flex mb={6}>
        <GreenDot />
        <Heading fontWeight="bold" fontSize="20px">
          Nhật ký nuôi trồng
        </Heading>
      </Flex>
      <Grid gridTemplateColumns="repeat(2,1fr)">
        {dairies.map(({ title, component }, i) => (
          <Box gridColumn={{ base: "span 2", md: "span 1" }}>
            <Heading fontSize="md">
              {i + 1 + ` .`} {title}
            </Heading>
            {component}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

const Feeding = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        <Timeline>
          {data.map((each) => (
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
          ))}
        </Timeline>
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
        <Timeline>
          {data.map((each) => (
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
          ))}
        </Timeline>
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
        <Timeline>
          {data.map((each) => (
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
          ))}
        </Timeline>
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
        <Timeline>
          {data.map(
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
            )
          )}
        </Timeline>
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
        <Timeline>
          {data.map((each) => (
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
                      {each.percentage ? each.percentage : "30"}% ao
                    </Text>
                  </Text>
                </ListItem>
              </List>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <Text>Không có ghi nhận</Text>
      )}
    </>
  );
};

export default DiaryTimeline;
