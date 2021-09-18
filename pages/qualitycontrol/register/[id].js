import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import RejectMessageModal from "@/components/dashboard/RejectMessageModal";
import fetcher from "@/utils/fetcher";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Popconfirm } from "antd";
import { useRouter } from "next/router";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import useSWR from "swr";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const onApprove = async () => {
    try {
      await fetch(`/api/product/approved`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id: router.query.id }),
      });
    } catch (error) {
      console.log(error.message);
    }

    router.back();
  };

  console.log("data here", data);

  return (
    <Layout>
      <Box>
        <Flex mb={5} align="center" justify="space-between">
          <Flex>
            <BackButton />
            <Heading>Duyệt đăng ký</Heading>
          </Flex>
          <Box>
            <Popconfirm
              title="Bạn có chắc là sẽ duyệt trại giống này?"
              onConfirm={onApprove}
              okText="Yes"
              cancelText="No"
            >
              <Button
                background="#88fcb62b"
                color="#22a669"
                mr="10px"
                leftIcon={<AiOutlineCheck />}
                _hover={{ background: "88fcb62b" }}
              >
                Duyệt
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Bạn có chắc là sẽ không duyệt trại giống này?"
              onConfirm={onOpen}
              okText="Yes"
              cancelText="No"
            >
              <Button
                background="#fc88882b"
                color="#a62222"
                leftIcon={<AiOutlineClose />}
                _hover={{ background: "fc88882b" }}
              >
                Từ chối
              </Button>
              <RejectMessageModal
                isOpen={isOpen}
                onClose={onClose}
                type="register"
                productId={router.query.id}
              />
            </Popconfirm>
          </Box>
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
                <Heading fontSize="lg" mb={8}>
                  Thông tin cơ sở nuôi trồng
                </Heading>
                <List spacing={4}>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên cơ sở nuôi:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.farm.name}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên chủ cơ sở nuôi:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.farm.owner}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.farm.address}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      SĐT:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.farm.phone}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Hình ảnh: <Image src={data.farm.images[0]} w="200px" />
                    </Text>
                  </ListItem>
                </List>
              </Box>
              <Box ml="4rem">
                <Heading fontSize="lg" mb={8}>
                  Thông tin ao nuôi & con giống
                </Heading>
                <List spacing={4}>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên ao:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.name}
                      </Box>
                    </Text>
                  </ListItem>

                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Mật độ thả:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.stockingDensity}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày thả giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.stockingDate}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày tuổi giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.seedAge}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    {/* TODO: Loss data here */}
                    <Text fontSize="md" fontWeight="bold">
                      Tên trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.hatchery.name}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.hatchery.address}
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
