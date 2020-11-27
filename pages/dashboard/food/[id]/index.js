import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/core";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const Index = ({}) => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/food/${router.query.id}`,
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        ]
      : null,
    fetcher
  );

  return (
    <Layout>
      <Box px={16} py={12}>
        {data && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Flex alignItems="center">
                <Box
                  fontSize="3rem"
                  as={BiArrowBack}
                  mr={8}
                  color="gray.500"
                  onClick={() => router.push("/dashboard/food")}
                />
                <Heading size="xl" fontWeight="medium" color="gray.800">
                  Thức ăn / {data.tenThucAn}
                </Heading>
              </Flex>
              <Button
                backgroundColor="gray.600"
                color="#fff"
                type="submit"
                onClick={() =>
                  router.push(`/dashboard/food/${router.query.id}/modify`)
                }
              >
                Chỉnh sửa thông tin
              </Button>
            </Flex>

            <List spacing={2} mt={12}>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Tên thức ăn:{" "}
                  <Box as="span" fontWeight="normal">
                    {data.tenThucAn}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Đơn vị cung cấp thức ăn:{" "}
                  <Box as="span" fontWeight="normal">
                    {data.donViCungCapThucAn}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Ngày sản xuất:{" "}
                  <Box as="span" fontWeight="normal">
                    {data.ngaySanXuat}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Ngày nhập:{" "}
                  <Box as="span" fontWeight="normal">
                    {data.ngayNhap}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Ngày hết hạn:{" "}
                  <Box as="span" fontWeight="normal">
                    {data.hanSuDung}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Số lượng:{" "}
                  <Box as="span" fontWeight="normal">
                    {data.soLuong} kg
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Hình ảnh:
                </Text>
                <Image src={data.hinhAnh[0]} height="30rem" mt={6} />
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
