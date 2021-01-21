import {
  Box,
  Button,
  Flex,
  Image,
  List,
  ListItem,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/core";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import BackButton from "@/components/dashboard/BackButton";

const Index = ({}) => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/food/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
          ,
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
                <BackButton />
                <Breadcrumb fontSize="xl" color="#485B6D">
                  <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => router.push("/farm/food")}>
                      Thức ăn
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{data.tenThucAn}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
              <Button
                backgroundColor="#098efc"
                color="#fff"
                type="submit"
                onClick={() =>
                  router.push(`/farm/food/${router.query.id}/modify`)
                }
              >
                Chỉnh sửa thông tin
              </Button>
            </Flex>

            <Flex
              px="4rem"
              py="6rem"
              mt={8}
              boxShadow="0 15px 30px rgba(0,0,0,.05)"
              background="#fff"
            >
              <Image src={data.hinhAnh[0]} h="20rem" mr="8rem" />
              <List spacing={4}>
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
              </List>
            </Flex>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
