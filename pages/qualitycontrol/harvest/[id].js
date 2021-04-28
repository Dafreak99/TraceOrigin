import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Collapse } from "antd";
import useSWR from "swr";
import { Table, Td, Th, Tr } from "@/components/Table";
import { FcInfo, FcList } from "react-icons/fc";
import QRCode from "qrcode.react";

const { Panel } = Collapse;

const Index = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/product/${router.query.id}/harvest`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  return (
    <Layout>
      <Box>
        <Flex alignItems="center">
          <BackButton />
          <Heading>{data && data.name}</Heading>
        </Flex>
        <Grid
          px="4rem"
          py="2rem"
          mt={8}
          boxShadow="0 15px 30px rgba(0,0,0,.05)"
          background="#fff"
          gridTemplateColumns="repeat(12, 1fr)"
        >
          {data ? (
            <>
              <Box gridColumn="span 12" mb="2rem">
                <Flex align="center" mb={4}>
                  <Box as={FcInfo} mr="1rem" h="28px" w="28px">
                    <span>1</span>
                  </Box>
                  <Heading fontSize="md">Thông tin sản phẩm</Heading>
                </Flex>
                <Grid gridTemplateColumns="repeat(2, 1fr)">
                  <List spacing={4}>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Tên sản phẩm:{" "}
                        <Box as="span" fontWeight="normal">
                          {data.name}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Trọng lượng:{" "}
                        <Box as="span" fontWeight="normal">
                          {data.weight}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Đơn vị:{" "}
                        <Box as="span" fontWeight="normal">
                          {data.unit}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Ngày thu hoạch:{" "}
                        <Box as="span" fontWeight="normal">
                          {data.harvestedDate}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Hình ảnh sản phẩm:{" "}
                        <Image
                          src={data.images[0]}
                          width="250px"
                          height="150px"
                          objectFit="cover"
                        />
                      </Text>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        QR:{" "}
                        <QRCode
                          size={100}
                          value={"http://traceorigin.vercel.app" + data.qrCode}
                        />
                      </Text>
                    </ListItem>
                  </List>
                </Grid>
              </Box>
              <Box gridColumn="span 6">
                <Flex align="center" mb={4}>
                  <Box as={FcInfo} mr="1rem" h="28px" w="28px" />
                  <Heading fontSize="md">Thông tin cơ sở nuôi</Heading>
                </Flex>
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
                      Hình ảnh cơ sở: <Image src={data.farm.images[0]} />
                    </Text>
                  </ListItem>
                </List>
              </Box>
              <Box gridColumn="span 6">
                <Flex align="center" mb={4}>
                  <Box as={FcInfo} mr="1rem" h="28px" w="28px" />
                  <Heading fontSize="md">Thông tin ao nuôi & con giống</Heading>
                </Flex>
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
                      Mã ao:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.code}
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
                        {data.seed.stockingDate}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày tuổi giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.seed.seedAge}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.seed.hatchery.name}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.seed.hatchery.address}
                      </Box>
                    </Text>
                  </ListItem>
                </List>
              </Box>
              <Collapse
                ghost
                style={{ marginTop: "2rem", gridColumn: "span 12" }}
              >
                <Panel header="Nhật ký cho ăn" key="1">
                  <Table>
                    <Tr>
                      <Th>Ngày cho ăn</Th>
                      <Th>Ghi chú</Th>
                      <Th>Khối lượng</Th>
                      <Th>Thức ăn</Th>
                      <Th>Hình ảnh</Th>
                      <Th>{""}</Th>
                    </Tr>
                    {data.feeding.map(
                      (
                        { createdDate, note, weight, food: { name, images } },
                        i
                      ) => (
                        <Tr cursor="pointer">
                          <Td>{createdDate}</Td>
                          <Td>{note}</Td>
                          <Td>{weight}</Td>
                          <Td>{name}</Td>
                          <Td>
                            <Image src={images[0]} h="100px" w="100px" />
                          </Td>
                        </Tr>
                      )
                    )}
                  </Table>
                </Panel>
                <Panel header="Nhật ký sử dụng thuốc" key="2">
                  <Table>
                    <Tr>
                      <Th>Ngày sử dụng</Th>
                      <Th>Khối lượng</Th>
                      <Th>Thức ăn</Th>
                      <Th>Hình ảnh</Th>
                      <Th>{""}</Th>
                    </Tr>
                    {data.usingMedicine.map(
                      (
                        { createdDate, weight, medicine: { name, images } },
                        i
                      ) => (
                        <Tr cursor="pointer">
                          <Td>{createdDate}</Td>
                          <Td>{weight}</Td>
                          <Td>{name}</Td>
                          <Td>
                            <Image src={images[0]} h="100px" w="100px" />
                          </Td>
                        </Tr>
                      )
                    )}
                  </Table>
                </Panel>
              </Collapse>
            </>
          ) : (
            <Flex gridColumn="span 12" justify="center" w="100%" h="100%">
              <Spinner />
            </Flex>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Index;
