import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListItem,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";
import { Collapse, Descriptions, Tabs } from "antd";

import GreenDot from "./GreenDot";
import { FaFish, FaPhone, FaSquareFull } from "react-icons/fa";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { GiWaterSplash, GiWeight } from "react-icons/gi";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const ProductInfo = ({ data, consumption }) => {
  return (
    <Box gridColumn={{ base: "span 12", xl: "span 6" }}>
      <Flex w="100%" borderRadius="3px">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Chi tiết sản phẩm" key="1">
            <Box
              border="2px solid rgb(19 154 243 / 10%)"
              p={8}
              borderBottom="3px solid #007bff"
            >
              <Tab1 {...data} />
            </Box>
          </TabPane>
          <TabPane tab="Nhật ký" key="2">
            <Box
              border="2px solid rgb(19 154 243 / 10%)"
              p={8}
              borderBottom="3px solid #007bff"
            >
              <Tab2 data={data} />
            </Box>
          </TabPane>
          <TabPane tab="Chứng thực" key="3">
            <Box
              border="2px solid rgb(19 154 243 / 10%)"
              p={8}
              borderBottom="3px solid #007bff"
            >
              <SimpleReactLightbox>
                <SRLWrapper
                  options={{ settings: { slideTransitionSpeed: 1 } }}
                  style={{ marginTop: "30px" }}
                >
                  <Flex mt="1rem">
                    {data.farm.authentication.images.map((image) => (
                      <Image src={image} height="150px" mr="1rem" />
                    ))}
                  </Flex>
                </SRLWrapper>
              </SimpleReactLightbox>
            </Box>
          </TabPane>
          {consumption.length > 0 && (
            <TabPane tab="Địa điểm tiêu thụ" key="4">
              <Box
                border="2px solid rgb(19 154 243 / 10%)"
                p={8}
                borderBottom="3px solid #007bff"
              >
                <Alert status="success" my="1rem" w="max-content">
                  <AlertIcon />
                  <Text fontSize="md">
                    TransactionID:{" "}
                    <a
                      target="blank"
                      href={
                        "https://test.ipdb.io/api/v1/transactions/" +
                        consumption[0].id
                      }
                    >
                      {consumption[0].id.slice(0, 32)}
                    </a>
                  </Text>
                </Alert>
                <List spacing={3}>
                  <ListItem>
                    <Flex align="center">
                      <Box as={FaFish} mr="0.5rem" />
                      <Text fontWeight="bold">
                        Tên địa điểm:{" "}
                        <Text as="span" fontWeight="normal">
                          {consumption[0].metadata.name}
                        </Text>
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex align="center">
                      <Box as={MdLocationOn} mr="0.5rem" />
                      <Text fontWeight="bold">
                        Địa chỉ:{" "}
                        <Text as="span" fontWeight="normal">
                          {consumption[0].metadata.address}
                        </Text>
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex align="center">
                      <Box as={FaPhone} mr="0.5rem" />
                      <Text fontWeight="bold">
                        SĐT:{" "}
                        <Text as="span" fontWeight="normal">
                          {consumption[0].metadata.phone}
                        </Text>
                      </Text>
                    </Flex>
                  </ListItem>
                </List>
              </Box>
            </TabPane>
          )}
        </Tabs>
      </Flex>
    </Box>
  );
};

const Tab1 = ({
  name,
  unit,
  weight,
  harvestedDate,
  seed: { stockingDate, hatchery },
}) => {
  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)">
      <List spacing={3} gridColumn={{ base: "span 12", md: "span 6" }}>
        <Flex mb={6}>
          <GreenDot />
          <Heading fontWeight="bold" fontSize="20px">
            Thông tin sản phẩm
          </Heading>
        </Flex>
        <ListItem>
          <Flex align="center">
            <Box as={FaFish} mr="0.5rem" />
            <Text fontWeight="bold">
              Tên sản phẩm:{" "}
              <Text as="span" fontWeight="normal">
                {name}
              </Text>
            </Text>
          </Flex>
        </ListItem>

        <ListItem>
          <Flex align="center">
            <Box as={MdDateRange} mr="0.5rem" />
            <Text fontWeight="bold">
              Ngày thu hoạch:{" "}
              <Text as="span" fontWeight="normal">
                {harvestedDate}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={FaSquareFull} mr="0.5rem" />
            <Text fontWeight="bold">
              Đơn vị:{" "}
              <Text as="span" fontWeight="normal">
                {unit}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={GiWeight} mr="0.5rem" />
            <Text fontWeight="bold">
              Trọng lượng:{" "}
              <Text as="span" fontWeight="normal">
                {weight}
              </Text>
            </Text>
          </Flex>
        </ListItem>
      </List>
      <List
        spacing={3}
        mt={4}
        gridColumn={{ base: "span 12", md: "span 6" }}
        mt={{ base: "4rem", md: 0 }}
      >
        <Flex mb={6}>
          <GreenDot />
          <Heading fontWeight="bold" fontSize="20px">
            Thông tin xuất xứ con giống
          </Heading>
        </Flex>

        <ListItem>
          <Flex align="center">
            <Box as={GiWaterSplash} mr="0.5rem" />
            <Text fontWeight="bold">
              Tên trại giống:{" "}
              <Text as="span" fontWeight="normal">
                {hatchery.name}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={MdLocationOn} mr="0.5rem" />
            <Text fontWeight="bold">
              Địa chỉ trại giống:{" "}
              <Text as="span" fontWeight="normal">
                {hatchery.address}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={MdDateRange} mr="0.5rem" />
            <Text fontWeight="bold">
              Ngày thả giống:{" "}
              <Text as="span" fontWeight="normal">
                {stockingDate}
              </Text>
            </Text>
          </Flex>
        </ListItem>

        <ListItem mt={4}>
          <Image
            src="http://portal1.traceverified.com/Images/Certificates/organica-logo.png"
            h="5rem"
          />
        </ListItem>
      </List>
    </Grid>
  );
};

const Tab2 = ({ data }) => {
  return (
    <>
      <Collapse
        defaultActiveKey={["1"]}
        ghost
        style={{ marginTop: "2rem", gridColumn: "span 12" }}
      >
        <Panel header="Nhật ký cho ăn" key="1">
          {data.feeding.map(
            ({ createdDate, note, weight, food: { name, images } }) => (
              <Descriptions>
                <Descriptions.Item label="Ngày tháng năm">
                  {createdDate}
                </Descriptions.Item>
                <Descriptions.Item label="Ghi chú">{note}</Descriptions.Item>
                <Descriptions.Item label="Tên thức ăn">
                  {name}
                </Descriptions.Item>
                <Descriptions.Item label="Khối lượng">
                  {weight}
                </Descriptions.Item>
                <Descriptions.Item label="Hình ảnh">
                  <Image src={images[0]} h="100px" />
                </Descriptions.Item>
              </Descriptions>
            )
          )}
        </Panel>

        <Panel header="Nhật ký sử dụng thuốc" key="2">
          {data.usingMedicine.map(
            ({ createdDate, weight, medicine: { name, images } }) => (
              <Descriptions>
                <Descriptions.Item label="Ngày tháng năm">
                  {createdDate}
                </Descriptions.Item>
                <Descriptions.Item label="Tên thức ăn">
                  {name}
                </Descriptions.Item>
                <Descriptions.Item label="Khối lượng">
                  {weight}
                </Descriptions.Item>
                <Descriptions.Item label="Hình ảnh">
                  <Image src={images[0]} h="100px" />
                </Descriptions.Item>
              </Descriptions>
            )
          )}
        </Panel>
      </Collapse>
    </>
  );
};

export default ProductInfo;
