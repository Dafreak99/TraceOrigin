import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Skeleton,
  List,
  ListItem,
  Flex,
  Grid,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";

import fetcher from "@/utils/fetcher";

import Layout from "@/components/dashboard/Layout";
import DisplayMap from "@/components/DisplayMap";
import { useRouter } from "next/router";
import BackButton from "@/components/dashboard/BackButton";
import { Popconfirm } from "antd";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import RejectMessageModal from "@/components/dashboard/RejectMessageModal";

const Hatchery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/hatchery/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  console.log(data);

  if (loading) {
    return (
      <Layout>
        <Heading mb={5}>Thông tin trại giống</Heading>
        <Box
          p="3rem 2rem"
          background="#fff"
          boxShadow="0 10px 30px rgba(0,0,0,.1)"
        >
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex mb={5} align="center" justify="space-between">
        <Flex>
          <BackButton />
          <Heading>Thông tin trại giống</Heading>
        </Flex>
        <Box>
          <Popconfirm
            title="Bạn có chắc là sẽ duyệt trại giống này?"
            // onConfirm={onApprove}
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
              type="hatchery"
            />
          </Popconfirm>
        </Box>
      </Flex>

      <Grid
        p="3rem 2rem"
        background="#fff"
        boxShadow="0 10px 30px rgba(0,0,0,.1)"
        gridTemplateColumns="repeat(2,1fr)"
        gridGap="4rem"
      >
        <List spacing={4}>
          <ListItem>
            <Heading fontSize="xl" color="#006aff">
              Đề xuất thêm trại giống
            </Heading>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Tên trại giống:{" "}
              <Box as="span" fontWeight="normal">
                {data.hatchery.name}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Địa chỉ:{" "}
              <Box as="span" fontWeight="normal">
                {data.hatchery.address}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Vị trí:{" "}
              <Box height="500px">
                <DisplayMap data={[data.hatchery]} />
              </Box>
            </Text>
          </ListItem>
        </List>
        {/* Second List */}

        <List spacing={4}>
          <ListItem>
            <Heading fontSize="xl" color="#006aff">
              Đề xuất từ
            </Heading>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              {data.farm.name}
            </Text>
          </ListItem>
          <ListItem>
            <Image
              src={data.farm.images[0]}
              height="10rem"
              width="15rem"
              objectFit="contain"
              borderRadius="3px"
              mt="2rem"
              mb="1rem"
            />
          </ListItem>

          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Họ và tên chủ cơ sở:{" "}
              <Box as="span" fontWeight="normal">
                {data.farm.owner}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Loại tài khoản:{" "}
              <Box as="span" fontWeight="normal">
                Nông dân
              </Box>
            </Text>
          </ListItem>

          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Diện tích trang trại:{" "}
              <Box as="span" fontWeight="normal">
                {data.farm.area}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fo ntSize="md" fontWeight="bold">
              Địa chỉ trang trại:{" "}
              <Box as="span" fontWeight="normal">
                {data.farm.address}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              SĐT liên hệ:{" "}
              <Box as="span" fontWeight="normal">
                {data.farm.phone}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Fax:{" "}
              <Box as="span" fontWeight="normal">
                {data.farm.fax}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Website:{" "}
              <Box as="span" fontWeight="normal">
                {data.farm.website}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Email:{" "}
              <Box as="span" fontWeight="normal">
                {data.farm.email}
              </Box>
            </Text>
          </ListItem>
        </List>
      </Grid>
    </Layout>
  );
};

export default Hatchery;
