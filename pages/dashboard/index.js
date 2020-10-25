import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  Skeleton,
} from "@chakra-ui/core";
import { useState } from "react";
import useSWR from "swr";

import FarmInfoModify from "@/components/dashboard/FarmInfoModify";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";

const Info = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { data, error } = useSWR(
    [
      "/api/farm",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  // First fetch usually returns undefined
  if (!data) {
    return (
      <Layout>
        <Skeleton height="20px" my="10px" w="40%" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" w="55%" />
      </Layout>
    );
  }

  if (data && data.message === "Empty") {
    // No Farm Info yet
    return (
      <Layout>
        <FarmInfoModify />
      </Layout>
    );
  }

  if (isEdit) {
    return (
      <Layout>
        <FarmInfoModify isEdit={isEdit} setIsEdit={setIsEdit} ata={data} d />
      </Layout>
    );
  }

  return (
    <Layout>
      {data && <Content data={data} isEdit={isEdit} setIsEdit={setIsEdit} />}
    </Layout>
  );
};

const Content = ({
  data: {
    tenCoSoNuoi,
    tenChuCoSoNuoi,
    hinhAnh,
    diaChi,
    dienTich,
    sdt,
    themVaoBoi,
  },
  isEdit,
  setIsEdit,
}) => {
  return (
    <Box px={16} py={12}>
      <Flex justifyContent="space-between">
        <Heading color="gray.700">Thông Tin Cơ Sở Của Bạn</Heading>
        <Button
          backgroundColor="gray.800"
          color="#fff"
          textTransform="uppercase"
          onClick={() => setIsEdit(!isEdit)}
        >
          Chỉnh sửa thông tin
        </Button>
      </Flex>

      <List spacing={2} mt={12}>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            Họ và tên chủ cơ sở:{" "}
            <Box as="span" fontWeight="normal">
              {tenChuCoSoNuoi}
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
            Tên cơ sở nuôi:{" "}
            <Box as="span" fontWeight="normal">
              {tenCoSoNuoi}
            </Box>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            Diện tích trang trại:{" "}
            <Box as="span" fontWeight="normal">
              {dienTich}
            </Box>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            Địa chỉ trang trại:{" "}
            <Box as="span" fontWeight="normal">
              {diaChi}
            </Box>
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="medium">
            SĐT liên hệ:{" "}
            <Box as="span" fontWeight="normal">
              {sdt}
            </Box>
          </Text>
        </ListItem>
      </List>
      <Box mt={12}>
        <Heading mb={12} color="gray.700">
          Hình ảnh trang trại của bạn
        </Heading>
        <Flex>
          {hinhAnh.map((image, i) => (
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
