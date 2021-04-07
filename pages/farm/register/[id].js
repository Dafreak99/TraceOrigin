import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Layout from "@/components/dashboard/Layout";
import useSWR from "swr";
import FormControl from "@/components/dashboard/FormControl";
import BackButton from "@/components/dashboard/BackButton";
import { message } from "antd";

const Index = () => {
  const router = useRouter();

  const [isSave, setIsSave] = useState(false);

  const { handleSubmit, register, reset } = useForm();

  const { data } = useSWR(
    [
      router.query.id ? `/api/pond/${router.query.id}` : null,
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const onSubmit = async (values) => {
    setIsSave(true);

    values.pond = data._id;

    try {
      let res = await fetch("/api/product", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
      message.error("Lỗi !");
    }

    reset();
    setIsSave(false);

    message.success("Đăng ký sản phẩm thành công. Chờ phê duyệt !");

    router.push("/farm/product-follow");
  };
  return (
    <Layout>
      <Box px={16} py={12} as="form" onSubmit={handleSubmit(onSubmit)}>
        {data && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Flex alignItems="center">
                <BackButton />
                <Heading>Đăng ký sản phẩm</Heading>
              </Flex>
              {isSave ? (
                <Button backgroundColor="gray.400" color="#fff">
                  <Spinner mr={4} /> Đang lưu
                </Button>
              ) : (
                <Button type="submit" backgroundColor="#007bff" color="#fff">
                  Tiến hành
                </Button>
              )}
            </Flex>

            <Grid
              gridTemplateColumns="repeat(2, 1fr)"
              columnGap={12}
              background="#fff"
              borderRadius="3px"
              boxShadow="0 4px 10px rgba(0,0,0,.1)"
              padding="2rem 3rem"
              mt="2rem"
            >
              <FormControl>
                <FormLabel htmlFor="name">Tên sản phẩm: </FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
            </Grid>
            <Grid
              gridTemplateColumns="repeat(2, 1fr)"
              columnGap={12}
              background="#fff"
              borderRadius="3px"
              boxShadow="0 4px 10px rgba(0,0,0,.1)"
              padding="2rem 3rem"
              mt="2rem"
            >
              <List spacing={2}>
                <Heading size="md" mt={4} mb={4}>
                  Thông tin con giống
                </Heading>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Ngày thả giống:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.seed.stockingDate}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Số lượng:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.seed.quantity}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Ngày tuổi của giống:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.seed.seedAge}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Tên trại giống:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.seed.hatchery.name}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Địa chỉ trại giống:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.seed.hatchery.address}
                    </Box>
                  </Text>
                </ListItem>
              </List>
              <List spacing={2}>
                <Heading size="md" mb={4} mt={4}>
                  Thông tin về ao nuôi
                </Heading>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Tên ao:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.name}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Mã ao:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.code}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Diện tích ao (hecta):{" "}
                    <Box as="span" fontWeight="normal">
                      {data.area}
                    </Box>
                  </Text>
                </ListItem>
              </List>
            </Grid>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
