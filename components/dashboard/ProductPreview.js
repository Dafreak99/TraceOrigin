import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Image,
  List,
  ListItem,
  Text,
  Spinner,
} from "@chakra-ui/react";

import { Collapse, message } from "antd";

import { Table, Td, Th, Tr } from "@/components/Table";

import { CaretRightOutlined } from "@ant-design/icons";
import { updateAsset } from "@/lib/bigchain";
import { useState } from "react";

const { Panel } = Collapse;

const ProductPreview = ({
  data,
  consumptionLocation,
  isOpen,
  onClose,
  isConfirmed,
  consumptionOnChain,
}) => {
  const [isSave, setIsSave] = useState(false);

  const onConfirm = async () => {
    setIsSave(true);

    const metadata = {
      ...consumptionLocation,
      datetime: new Date().toString(),
      type: "CONSUMPTIONLOCATION",
    };

    // let txtId;

    // if (consumptionOnChain.length >= 0) {
    //   txtId = consumptionOnChain[consumptionOnChain.length - 1].id;
    // } else {
    //   txtId = data.transactionId;
    // }

    await updateAsset(data.transactionId, metadata);
    message.success("Dữ liệu đã được thêm vào chuỗi khối !");
    setIsSave(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Xác nhận sản phẩm</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="4rem">
          <Body data={data} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Đóng
          </Button>
          {isSave ? (
            <Button backgroundColor="gray.400" color="#fff">
              <Spinner mr={4} /> Đang lưu
            </Button>
          ) : (
            <Button type="submit" onClick={onConfirm} disabled={isConfirmed}>
              Xác nhận
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Body = ({ data }) => {
  return (
    <Box height="50vh" overflowY="scroll">
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
          <List spacing={4} display="grid" gridTemplateColumns="repeat(2, 1fr)">
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
                Tên con giống:{" "}
                <Box as="span" fontWeight="normal">
                  {data.seed.name}
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
                  ({ createdDate, weight, medicine: { name, images } }, i) => (
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
                {data.dailyNote.map(({ createdDate, note, images }, i) => (
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
                ))}
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
                    { createdDate, H2S, NH3, alkalinity, oxy, ph, salinity },
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
    </Box>
  );
};

export default ProductPreview;
