import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const Index = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/medicine/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
          ,
        ]
      : null,
    fetcher
  );

  return (
    <Layout>
      <Box>
        {/* {data && (
            <>
              <Flex alignItems="center" justify="space-between">
                <Flex>
                  <Box
                    as={BiArrowBack}
                    mr={8}
                    fontSize="3rem"
                    color="gray.500"
                    onClick={() => router.push("/dashboard/medicine")}
                  />
                  <Heading size="xl" fontWeight="medium" color="gray.800">
                    Thuốc / {data.name}
                  </Heading>
                </Flex>
                <Button
                  backgroundColor="gray.600"
                  color="#fff"
                  type="submit"
                  onClick={() =>
                    router.push(`/dashboard/medicine/${router.query.id}/modify`)
                  }
                >
                  Chỉnh sửa thông tin
                </Button>
              </Flex>
  
              <List spacing={2} mt={12}>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Tên thuốc:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.name}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Đơn vị cung cấp thuốc:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.medicineSupplier}
                    </Box>
                  </Text>
                </ListItem>
  
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Địa chỉ đơn vị cung cấp thuốc:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.medicineSupplierAddress}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Ngày nhập thuốc:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.importDate}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Ngày sản xuất:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.manufactureDate}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Ngày hết hạn:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.expiryDate}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Số lượng:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.weight} kg
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Cách bảo quản:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.preservationMethod}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Hình ảnh:
                  </Text>
                  <Image src={data.images[0]} height="30rem" mt={6} />
                </ListItem>
              </List>
            </>
          )} */}
      </Box>
    </Layout>
  );
};

export default Index;
