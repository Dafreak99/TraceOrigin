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
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import BackButton from "@/components/dashboard/BackButton";
import Link from "next/link";

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
                    <BreadcrumbLink>
                      <Link href="/farm/food">
                        <a>Thức ăn</a>
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{data.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
              <Button backgroundColor="#098efc" color="#fff" type="submit">
                <Link href={`/farm/food/${router.query.id}/modify`}>
                  <a>Chỉnh sửa thông tin</a>
                </Link>
              </Button>
            </Flex>

            <Flex
              px="4rem"
              py="6rem"
              mt={8}
              boxShadow="0 15px 30px rgba(0,0,0,.05)"
              background="#fff"
            >
              <Image src={data.images[0]} h="20rem" mr="8rem" />
              <List spacing={4}>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Tên thức ăn:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.name}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Đơn vị cung cấp thức ăn:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.foodSupplier}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Ngày sản xuất:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.manufactureDate}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Ngày nhập:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.importDate}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Ngày hết hạn:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.expiryDate}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Số lượng:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.weight} kg
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
