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
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Collapse, message, Popconfirm } from "antd";
import useSWR from "swr";
import { Table, Td, Th, Tr } from "@/components/Table";

import { CaretRightOutlined } from "@ant-design/icons";
import RejectMessageModal from "@/components/dashboard/RejectMessageModal";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { deployToBlockchain } from "@/lib/bigchain";

const { Panel } = Collapse;

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { data } = useSWR(
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
      let product = await (
        await fetch(`/api/product/harvest/approve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.browser
              ? localStorage.getItem("token")
              : null,
          },
          body: JSON.stringify({
            productId: router.query.id,
            pondId: data.pond._id,
          }),
        })
      ).json();

      let id = await deployToBlockchain(product);

      message.success(
        `Duyệt thu hoạch thành công ! Dữ liệu đã được đưa lên blockchain.
        `
      );
      router.back();
    } catch (error) {
      console.log(error.message);
    }
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
                  title="Bạn có chắc là sẽ duyệt thu hoạch sản phẩm này?"
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
                  title="Bạn có chắc là sẽ không duyệt thu hoạch sản phẩm này?"
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
                  {/* Start FeedingDiary */}
                  <Panel header="Cho ăn" key="1">
                    <Table>
                      <Tr>
                        <Th>#</Th>
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
                            <Td>{i + 1}</Td>
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
                  {/* End FeedingDiary */}

                  {/* End UsingMedicine */}
                  <Panel header="Sử dụng thuốc" key="2">
                    <Table>
                      <Tr>
                        <Th>#</Th>
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
                            <Td>{i + 1}</Td>
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
                  {/* End UsingMedicine */}

                  {/* Start DailyNote */}
                  <Panel header="Hằng ngày" key="3">
                    <Table>
                      <Tr>
                        <Th>#</Th>
                        <Th>Ngày ghi</Th>
                        <Th>Ghi chú</Th>
                        <Th>Hình ảnh</Th>
                      </Tr>
                      {data.dailyNote.map(
                        ({ createdDate, note, images }, i) => (
                          <Tr cursor="pointer">
                            <Td>{i + 1}</Td>
                            <Td>{createdDate}</Td>
                            <Td>{note}</Td>
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
                  {/* End UsingMedicine */}

                  {/* Start PondEnvironment */}
                  <Panel header="Môi trường ao " key="4">
                    <Table>
                      <Tr>
                        <Th>#</Th>
                        <Th>Ngày ghi</Th>
                        <Th>Oxy(mg/l)</Th>
                        <Th>pH</Th>
                        <Th>Độ kiềm</Th>
                        <Th>Độ mặn</Th>
                        <Th>H2S(mg/l)</Th>
                        <Th>NH3(mg/l)</Th>
                      </Tr>
                      {data.pondEnvironment.map(
                        (
                          {
                            createdDate,
                            H2S,
                            NH3,
                            alkalinity,
                            oxy,
                            ph,
                            salinity,
                          },
                          i
                        ) => (
                          <Tr cursor="pointer">
                            <Td>{i + 1}</Td>
                            <Td>{createdDate}</Td>
                            <Td>{oxy}</Td>
                            <Td>{ph}</Td>
                            <Td>{alkalinity}</Td>
                            <Td>{salinity}</Td>
                            <Td>{H2S}</Td>
                            <Td>{NH3}</Td>
                          </Tr>
                        )
                      )}
                    </Table>
                  </Panel>
                  {/* End PondEnvironment */}
                </Collapse>
              </Panel>
            </Collapse>
          </>
        ) : (
          <Stack>
            <Skeleton height="20px" width="400px" active mb="2rem" />
            <Skeleton height="50px" width="600px" active />
            <Skeleton height="50px" active />
            <Skeleton height="50px" active />
            <Skeleton height="50px" active />
          </Stack>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
