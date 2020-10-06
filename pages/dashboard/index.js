import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/core";
import FarmInfoModify from "./FarmInfoModify";
import Layout from "./Layout";

import { getYourFarm } from "../../lib/db-admin";

const Info = ({ data }) => {
  return <Layout>{data ? <Content data={data} /> : <FarmInfoModify />}</Layout>;
};
// Remove iso
const Content = ({
  data: { farmName, farmOwner, address, acreage, phoneNumber, farmImage },
}) => {
  return (
    <Box px={16} py={12}>
      <Flex justifyContent="space-between">
        <Heading color="gray.700">Thông Tin Cơ Sở Của Bạn</Heading>
        <Button
          backgroundColor="gray.800"
          color="#fff"
          textTransform="uppercase"
        >
          Chỉnh sửa thông tin
        </Button>
      </Flex>

      <List spacing={2} mt={12}>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            Họ và tên chủ cơ sở:{" "}
            <Box as="span" fontWeight="normal">
              {farmOwner}
            </Box>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            Loại tài khoản:{" "}
            <Box as="span" fontWeight="normal">
              Nông dân
            </Box>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            Tên trang trại:{" "}
            <Box as="span" fontWeight="normal">
              {farmName}
            </Box>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            Diện tích trang trại:{" "}
            <Box as="span" fontWeight="normal">
              {acreage}
            </Box>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            Địa chỉ trang trại:{" "}
            <Box as="span" fontWeight="normal">
              {address}
            </Box>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            SĐT liên hệ:{" "}
            <Box as="span" fontWeight="normal">
              {phoneNumber}
            </Box>
          </Text>
        </ListItem>
      </List>
      <Box mt={12}>
        <Heading mb={12} color="gray.700">
          Hình ảnh trang trại của bạn
        </Heading>
        <Flex>
          {farmImage.map((image, i) => (
            <Image
              key={i}
              src={image}
              height="20rem"
              width="30rem"
              objectFit="contain"
              border="3px solid #f2eded"
              borderRadius="3px"
              mr={4}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Info;

export async function getStaticProps(context) {
  // Don't need to make api request
  try {
    const data = await getYourFarm(
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY"
    );

    return {
      props: {
        data: JSON.parse(JSON.stringify(data[0])),
      },
    };
  } catch (error) {
    console.log(error.message);
  }
}
