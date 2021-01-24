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
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Collapse } from "antd";
import useSWR from "swr";
import { Table, Td, Th, Tr } from "@/components/Table";
import { format } from "date-fns";
import { FcInfo, FcList } from "react-icons/fc";
import QRCode from "qrcode.react";

const { Panel } = Collapse;

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

  return (
    <Layout>
      <Box px={16} py={12}>
        <Flex alignItems="center">
          <BackButton />
          <Heading>{data && data.tenSanPham}</Heading>
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
                          {data.tenSanPham}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Trọng lượng:{" "}
                        <Box as="span" fontWeight="normal">
                          {data.trongLuong}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Đơn vị:{" "}
                        <Box as="span" fontWeight="normal">
                          {data.donvi}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Ngày thu hoạch:{" "}
                        <Box as="span" fontWeight="normal">
                          {format(new Date(data.ngayThuHoach), "dd-MM-yyyy")}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        Hình ảnh sản phẩm: <Image src={data.hinhAnh[0]} />
                      </Text>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <Text fontSize="md" fontWeight="bold">
                        QR: <QRCode value={data.qrCode} />
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
                      Hình ảnh cơ sở: <Image src={data.farm.hinhAnh[0]} />
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
                        {data.seed.ngayThaGiong}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày tuổi giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.seed.ngayTuoiGiong}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.seed.traiGiong.tenTraiGiong}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.seed.traiGiong.diaChiTraiGiong}
                      </Box>
                    </Text>
                  </ListItem>
                </List>
              </Box>
              <Collapse
                // defaultActiveKey={["1"]}
                // TODO: Display full information of Product before harvest
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
                        {
                          ngayThangNam,
                          ghiChu,
                          khoiLuong,
                          thucAn: { tenThucAn, hinhAnh },
                        },
                        i
                      ) => (
                        <Tr
                          backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                          cursor="pointer"
                          // onClick={() => router.push(`./product/${_id}`)}
                        >
                          <Td>
                            {format(new Date(ngayThangNam), "dd/MM/yyyy")}
                          </Td>
                          <Td>{ghiChu}</Td>
                          <Td>{khoiLuong}</Td>
                          <Td>{tenThucAn}</Td>
                          <Td>
                            <Image src={hinhAnh[0]} h="100px" w="100px" />
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
                        {
                          ngayThangNam,
                          khoiLuongThuoc,
                          thuoc: { tenThuoc, hinhAnh },
                        },
                        i
                      ) => (
                        <Tr
                          backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                          cursor="pointer"
                          // onClick={() => router.push(`./product/${_id}`)}
                        >
                          <Td>
                            {format(new Date(ngayThangNam), "dd/MM/yyyy")}
                          </Td>
                          <Td>{khoiLuongThuoc}</Td>
                          <Td>{tenThuoc}</Td>
                          <Td>
                            <Image src={hinhAnh[0]} h="100px" w="100px" />
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
