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

import { Button as ButtonD } from "antd";

import { Comment } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Form from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import GreenDot from "./GreenDot";

const ProductInfo = ({ data }) => {
  const [index, setIndex] = useState(0);

  return (
    <Box mt="6rem" w={{ base: "100%", xl: "56.25rem" }}>
      <Flex w="max-content" borderRadius="3px">
        <Box
          className={index === 0 ? "product-tab active" : "product-tab"}
          onClick={() => setIndex(0)}
        >
          Chi tiết sản phẩm
        </Box>
        <Box
          className={index === 1 ? "product-tab active" : "product-tab"}
          onClick={() => setIndex(1)}
        >
          Đánh giá
        </Box>
      </Flex>
      <Box
        p={8}
        border="2px solid rgb(19 154 243 / 10%)"
        borderTop="3px solid #007bff"
      >
        {index === 0 ? <Tab1 {...data} /> : <Tab2 />}
      </Box>
    </Box>
  );
};

const Tab1 = ({
  tenSanPham,
  giaSanPham,
  hinhAnh,
  donvi,
  khoiLuong,
  pond: { seed },
}) => {
  const {
    soLuongConGiong,
    ngayThaGiong,
    tenTraiGiong,
    diaChiTraiGiong,
    ngayTuoiGiong,
  } = seed;

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
          <Text fontWeight="bold">
            Tên sản phẩm:{" "}
            <Text as="span" fontWeight="normal">
              {tenSanPham}
            </Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">
            Giá sản phẩm:{" "}
            <Text as="span" fontWeight="normal">
              {giaSanPham}
            </Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">
            Đơn vị:{" "}
            <Text as="span" fontWeight="normal">
              {donvi}
            </Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">
            Khối lượng:{" "}
            <Text as="span" fontWeight="normal">
              {khoiLuong}
            </Text>
          </Text>
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
          <Text fontWeight="bold">
            Tên trại giống:{" "}
            <Text as="span" fontWeight="normal">
              {tenTraiGiong}
            </Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">
            Địa chỉ trại giống:{" "}
            <Text as="span" fontWeight="normal">
              {diaChiTraiGiong}
            </Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">
            Ngày thả giống: {""}
            <Text as="span" fontWeight="normal">
              {ngayThaGiong}
            </Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">
            Khối lượng:{" "}
            <Text as="span" fontWeight="normal">
              {khoiLuong}
            </Text>
          </Text>
        </ListItem>
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

const Tab2 = () => {
  return (
    <Comment
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        <Box>
          <Input placeholder="Thêm bình luận" h="10rem" />
          <Button backgroundColor="#007bff" color="#fff" px={10} py={6} mt={10}>
            ĐĂNG
          </Button>
        </Box>
      }
    />
  );
};

export default ProductInfo;
