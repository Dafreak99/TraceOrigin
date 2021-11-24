import { Timeline } from "antd";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  List,
  ListItem,
  Alert,
} from "@chakra-ui/react";
import GreenDot from "./GreenDot";
import { format } from "date-fns";
import DiaryTimeline from "./DiaryTimeline";

const FoodChainTimeline = ({ data, consumption }) => {
  const {
    seed: { stockingDate },
    isHarvested: {
      harvestProduct: { harvestedDate, packingMethod, weight, note },
    },
    farm: { name },
  } = data;

  return (
    <Box width={{ base: "100%" }} mt="2rem">
      <Flex alignItems="center">
        <GreenDot />
        <Heading size="md">Timeline</Heading>
      </Flex>
      <Timeline style={{ marginTop: "2rem" }}>
        <Timeline.Item>
          <List spacing={3} mt={4}>
            <ListItem>
              <Text fontWeight="bold" textTransform="uppercase" mt="2rem">
                Thả giống xuống ao
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Ngày:{" "}
                <Text as="span" fontWeight="normal">
                  {stockingDate}
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Ghi nhận bởi:{" "}
                <Text as="span" fontWeight="normal">
                  {name}
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Tên con giống:{" "}
                <Text as="span" fontWeight="normal">
                  {data.seed.name}
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Mật độ thả:{" "}
                <Text as="span" fontWeight="normal">
                  {data.seed.stockingDensity} (con/m2)
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Ngày tuổi:{" "}
                <Text as="span" fontWeight="normal">
                  {data.seed.seedAge}
                </Text>
              </Text>
            </ListItem>
          </List>

          <Image src="/pond.svg" h="40px" />
        </Timeline.Item>

        <Timeline.Item>
          <List spacing={3} mt={4}>
            <ListItem>
              <Text fontWeight="bold" textTransform="uppercase" mt="2rem">
                Nhật ký nuôi trồng
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Thời gian:{" "}
                <Text as="span" fontWeight="normal">
                  Từ {stockingDate}
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Ghi nhận bởi:{" "}
                <Text as="span" fontWeight="normal">
                  {name}
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Nội dung:{" "}
                <Text as="span" fontWeight="normal">
                  Xem chi tiết nhật ký nuôi trồng ở bên dưới
                </Text>
              </Text>
            </ListItem>
            {/* <DiaryTimeline data={data} /> */}
          </List>

          <Image src="/essay.png" h="40px" mt="2rem" />
        </Timeline.Item>
        <Timeline.Item>
          <List spacing={3} mt={4}>
            <ListItem>
              <Text fontWeight="bold" textTransform="uppercase" mt="2rem">
                Thu hoạch
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Thời gian:{" "}
                <Text as="span" fontWeight="normal">
                  {harvestedDate}
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Ghi nhận bởi:{" "}
                <Text as="span" fontWeight="normal">
                  {name}
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Quy cách đóng gói:{" "}
                <Text as="span" fontWeight="normal">
                  {packingMethod}
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Khối lượng:{" "}
                <Text as="span" fontWeight="normal">
                  {weight} kg
                </Text>
              </Text>
            </ListItem>
            <ListItem>
              <Text fontWeight="bold">
                Ghi chú:{" "}
                <Text as="span" fontWeight="normal">
                  {note}
                </Text>
              </Text>
            </ListItem>
          </List>
          <Image src="/ice-fishing.svg" h="40px" />
        </Timeline.Item>
        {consumption.length > 0 &&
          consumption.map((each) => (
            <Timeline.Item>
              <List spacing={3} mt={4}>
                <ListItem>
                  <Text fontWeight="bold" textTransform="uppercase" mt="2rem">
                    Địa điểm tiêu thụ
                  </Text>
                </ListItem>
                <ListItem>
                  <Alert status="success" my="1rem" w="100%">
                    <Text fontSize="md">
                      TransactionID:{" "}
                      <a
                        style={{ textDecoration: "underline" }}
                        target="blank"
                        href={
                          "https://bigchain.tk/api/v1/transactions/" + each.id
                        }
                      >
                        {each.id}
                      </a>
                    </Text>
                  </Alert>
                </ListItem>

                <ListItem>
                  <Text fontWeight="bold">
                    Thời gian:{" "}
                    <Text as="span" fontWeight="normal">
                      {format(
                        new Date(each.metadata.datetime),
                        "dd/MM/yyyy, HH:mm bbb"
                      )}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Tên địa điểm:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.metadata.name}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Địa chỉ:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.metadata.address}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Số điện thoại:{" "}
                    <Text as="span" fontWeight="normal">
                      {each.metadata.phone}
                    </Text>
                  </Text>
                </ListItem>
              </List>
              <Image src="/store.svg" h="40px" />
            </Timeline.Item>
          ))}
      </Timeline>
    </Box>
  );
};

export default FoodChainTimeline;
