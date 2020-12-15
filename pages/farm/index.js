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
import DisplayMap from "@/components/DisplayMap";

const Info = () => {
  console.log("AAAA");
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
        <Box px={12} py={16}>
          <Skeleton height="20px" my="10px" w="40%" />
          <Skeleton height="20px" my="10px" />
          <Skeleton height="20px" my="10px" />
          <Skeleton height="20px" my="10px" w="55%" />
        </Box>
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
        <FarmInfoModify isEdit={isEdit} setIsEdit={setIsEdit} data={data} />
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
    toaDo,
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
      <Flex paddingTop={12}>
        <List
          spacing={2}
          px={16}
          py={12}
          boxShadow="0 4px 10px rgba(0,0,0,.1)"
          w="max-content"
          background="#fff"
        >
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
        {toaDo && (
          <Box w="500px" ml={8}>
            <DisplayMap entry={toaDo} />
          </Box>
        )}
      </Flex>

      <Box mt={12}>
        <Heading mb={8} color="gray.700" fontSize="xl">
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
