import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Collapse, Popconfirm } from "antd";
import useSWR from "swr";
import { Table, Td, Th, Tr } from "@/components/Table";

import { CaretRightOutlined } from "@ant-design/icons";
import RejectMessageModal from "@/components/dashboard/RejectMessageModal";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const { Panel } = Collapse;

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/product/${router.query.id}/pending-harvest`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  const onApprove = async () => {
    try {
      await fetch(`/api/product/harvest/approve`, {
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

  return (
    <Layout>
      <Box>
        {data ? (
          <>
            <Flex mb={5} align="center" justify="space-between">
              <Flex>
                <BackButton />
                <Heading>{data.name}</Heading>
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
                    type="harvest"
                    productId={router.query.id}
                  />
                </Popconfirm>
              </Box>
            </Flex>

            <Collapse
              style={{ marginTop: "2rem" }}
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              {/* THÔNG TIN SẢN PHẨM */}
              <Panel
                header="Thông tin sản phẩm"
                key="1"
                className="site-collapse-custom-panel"
                style={{ padding: "20px" }}
              >
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
                      Khối lượng thu hoạch:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.isHarvested.harvestProduct.weight} KG
                      </Box>
                    </Text>
                  </ListItem>

                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày thu hoạch:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.isHarvested.harvestProduct.harvestedDate}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Quy cách đóng gói:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.isHarvested.harvestProduct.packingMethod}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên nơi tiêu thụ:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.isHarvested.harvestProduct.consumption.name}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ tiêu thụ:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.isHarvested.harvestProduct.consumption.address}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      SĐT nơi tiêu thụ:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.isHarvested.harvestProduct.consumption.phone}
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
              </Panel>

              {/* THÔNG TIN CƠ SỞ NUÔI */}
              <Panel
                header="Thông tin cơ sở nuôi"
                key="2"
                className="site-collapse-custom-panel"
                style={{ padding: "20px" }}
              >
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
              </Panel>

              {/* THÔNG TIN AO NUÔI */}
              <Panel
                header="Thông tin ao nuôi & con giống"
                key="3"
                className="site-collapse-custom-panel"
                style={{ padding: "20px" }}
              >
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
              </Panel>

              {/* NHẬT KÝ */}
              <Panel
                header="Nhật ký"
                key="4"
                className="site-collapse-custom-panel"
                style={{ padding: "20px" }}
              >
                <Collapse ghost>
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
                              <Image
                                src={images[0]}
                                h="50px"
                                w="auto"
                                objectFit="cover"
                              />
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
                              <Image
                                src={images[0]}
                                h="50px"
                                w="auto"
                                objectFit="cover"
                              />
                            </Td>
                          </Tr>
                        )
                      )}
                    </Table>
                  </Panel>
                </Collapse>
              </Panel>
            </Collapse>
          </>
        ) : (
          <Skeleton height="300px" active />
        )}
      </Box>
    </Layout>
  );
};

export default Index;
