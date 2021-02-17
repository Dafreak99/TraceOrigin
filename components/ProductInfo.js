import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  List,
  ListItem,
  Text,
} from "@chakra-ui/core";

import { Collapse, Comment } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Table, Td, Th, Tr } from "@/components/Table";

import { useState } from "react";
import { Descriptions, Badge } from "antd";
import GreenDot from "./GreenDot";
import { Tabs } from "antd";
import { FaFish, FaSquareFull } from "react-icons/fa";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { GiWaterSplash, GiWeight } from "react-icons/gi";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const ProductInfo = ({ data }) => {
  const [index, setIndex] = useState(0);

  function callback(key) {
    console.log(key);
  }

  return (
    <Box gridColumn={{ base: "span 12", xl: "span 6" }}>
      <Flex w="100%" borderRadius="3px">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Chi tiết sản phẩm" key="1">
            <Box
              border="2px solid rgb(19 154 243 / 10%)"
              p={8}
              borderBottom="3px solid #007bff"
            >
              <Tab1 {...data} />
            </Box>
          </TabPane>
          <TabPane tab="Chuỗi liên kết" key="2">
            <Box
              border="2px solid rgb(19 154 243 / 10%)"
              p={8}
              borderBottom="3px solid #007bff"
            >
              <Tab2 data={data} />
            </Box>
          </TabPane>
          <TabPane tab="Xác thực" key="3">
            <Box
              border="2px solid rgb(19 154 243 / 10%)"
              p={8}
              borderBottom="3px solid #007bff"
            >
              {data.farm.authentication.images.map((image) => (
                <Image src={image} w="80%" />
              ))}
            </Box>
          </TabPane>
        </Tabs>
      </Flex>
    </Box>
  );
};

const Tab1 = ({
  name,
  images,
  unit,
  weight,
  harvestedDate,
  seed: { stockingDate, hatchery },
}) => {
  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)">
      <List spacing={3} mt={4} gridColumn={{ base: "span 12", md: "span 6" }}>
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
        <Flex align="center">
          <Box as={MdDateRange} mr="0.5rem" />
          <Text fontWeight="bold">
            Ngày thả giống:{" "}
            <Text as="span" fontWeight="normal">
              {stockingDate}
            </Text>
          </Text>
        </Flex>

        <ListItem>
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
  console.log(data);
  return (
    // <Comment
    //   avatar={
    //     <Avatar
    //       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    //       alt="Han Solo"
    //     />
    //   }
    //   content={
    //     <Box>
    //       <Input placeholder="Thêm bình luận" h="10rem" />
    //       <Button backgroundColor="#007bff" color="#fff" px={10} py={6} mt={10}>
    //         ĐĂNG
    //       </Button>
    //     </Box>
    //   }
    // />

    // <Collapse
    //   defaultActiveKey={["1"]}
    //   // TODO: Display full information of Product before harvest
    //   ghost
    //   style={{ marginTop: "2rem", gridColumn: "span 12" }}
    // >
    //   <Panel header="Nhật ký cho ăn" key="1">
    //     <Table>
    //       <Tr>
    //         <Th>Ngày cho ăn</Th>
    //         <Th>Ghi chú</Th>
    //         <Th>Khối lượng</Th>
    //         <Th>Thức ăn</Th>
    //         <Th>Hình ảnh</Th>
    //         <Th>{""}</Th>
    //       </Tr>
    //       {data.feeding.map(
    //         (
    //           {
    //             createdDate,
    //             note,
    //             weight,
    //             food: { name, images },
    //           },
    //           i
    //         ) => (
    //           <Tr
    //             backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
    //             cursor="pointer"
    //             // onClick={() => router.push(`./product/${_id}`)}
    //           >
    //             <Td>{createdDate}</Td>
    //             <Td>{note}</Td>
    //             <Td>{weight}</Td>
    //             <Td>{name}</Td>
    //             <Td>
    //               <Image src={images[0]} h="100px" w="100px" />
    //             </Td>
    //           </Tr>
    //         )
    //       )}
    //     </Table>
    //   </Panel>
    //   <Panel header="Nhật ký sử dụng thuốc" key="2">
    //     <Table>
    //       <Tr>
    //         <Th>Ngày sử dụng</Th>
    //         <Th>Khối lượng</Th>
    //         <Th>Thức ăn</Th>
    //         <Th>Hình ảnh</Th>
    //         <Th>{""}</Th>
    //       </Tr>
    //       {data.usingMedicine.map(
    //         (
    //           { createdDate, weight, medicine: { name, images } },
    //           i
    //         ) => (
    //           <Tr
    //             backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
    //             cursor="pointer"
    //             // onClick={() => router.push(`./product/${_id}`)}
    //           >
    //             <Td>{createdDate}</Td>
    //             <Td>{weight}</Td>
    //             <Td>{name}</Td>
    //             <Td>
    //               <Image src={images[0]} h="100px" w="100px" />
    //             </Td>
    //           </Tr>
    //         )
    //       )}
    //     </Table>
    //   </Panel>
    // </Collapse>
    <>
      <Collapse
        defaultActiveKey={["1"]}
        // TODO: Display full information of Product before harvest
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
