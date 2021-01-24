import {
  Box,
  Button,
  Flex,
  Image,
  List,
  ListItem,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/core";
import { useRouter } from "next/router";

import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import BackButton from "@/components/dashboard/BackButton";
import { format } from "date-fns";
import { Collapse } from "antd";
import { Table, Td, Th, Tr } from "@/components/Table";
const { Panel } = Collapse;
const Index = ({}) => {
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

  const text = `
  A dog is a type of domesticated animal.
  
`;

  return (
    <Layout>
      <Box px={16} py={12}>
        {data && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Flex alignItems="center">
                <BackButton />
                <Breadcrumb fontSize="xl" color="#485B6D">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      onClick={() => router.push("/business/product")}
                    >
                      Sản phẩm chờ duyệt
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{data.tenSanPham}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
              <Button backgroundColor="#098efc" color="#fff" type="submit">
                Chỉnh sửa thông tin
              </Button>
            </Flex>

            <Flex
              px="4rem"
              py="6rem"
              mt={8}
              boxShadow="0 15px 30px rgba(0,0,0,.05)"
              background="#fff"
            >
              <Image src={data.hinhAnh[0]} h="20rem" mr="8rem" />
              <List spacing={4}>
                <Heading fontSize="xl" mb={6}>
                  Thông tin sản phẩm
                </Heading>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Tên sản phẩm:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.tenSanPham}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Trọng lượng:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.trongLuong}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Đơn vị:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.donvi}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Ngày thu hoạch:{" "}
                    <Box as="span" fontWeight="normal">
                      {format(new Date(data.ngayThuHoach), "dd/MM/yyyy")}
                    </Box>
                  </Text>
                </ListItem>

                <Collapse defaultActiveKey={["1"]} ghost>
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
                            onClick={() => router.push(`./product/${_id}`)}
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
                            onClick={() => router.push(`./product/${_id}`)}
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
              </List>
            </Flex>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
