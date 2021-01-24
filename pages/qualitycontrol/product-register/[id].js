import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import useSWR from "swr";

const Index = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/product/${router.query.id}`,

          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  // Data here is {}

  return (
    <Layout>
      <Box px={16} py={12}>
        <Flex alignItems="center">
          <BackButton />
          <Heading>{data && data.tenSanPham}</Heading>
        </Flex>
        <Flex
          px="4rem"
          py="2rem"
          mt={8}
          boxShadow="0 15px 30px rgba(0,0,0,.05)"
          background="#fff"
        >
          {data ? (
            <>
              <Box>
                <Heading fontSize="md" mb={4}>
                  Thông tin cơ sở nuôi trồng
                </Heading>
                <List spacing={4}>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên cơ sở nuôi:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.farm.tenCoSoNuoi}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên chủ cơ sở nuôi:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.farm.tenChuCoSoNuoi}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.farm.diaChi}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      SĐT:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.farm.sdt}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Hình ảnh: <Image src={data.farm.hinhAnh[0]} />
                    </Text>
                  </ListItem>
                </List>
              </Box>
              <Box ml="4rem">
                <Heading fontSize="md" mb={4}>
                  Thông tin ao nuôi & con giống
                </Heading>
                <List spacing={4}>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên ao:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.tenAo}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Mã ao:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.maAo}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Mật độ thả:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.matDoTha}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày thả giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.ngayThaGiong}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày tuổi giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.ngayTuoiGiong}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.traiGiong.tenTraiGiong}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.traiGiong.diaChiTraiGiong}
                      </Box>
                    </Text>
                  </ListItem>
                </List>
              </Box>
            </>
          ) : (
            <Flex justify="center" w="100%" h="100%">
              <Spinner />
            </Flex>
          )}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Index;
