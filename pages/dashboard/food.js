import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  Heading,
  Image,
} from "@chakra-ui/core";
import Layout from "../../components/dashboard/Layout";
import { Table, Th, Td, Tr } from "../../components/Table";
import useSWR from "swr";

import fetcher from "../../utils/fetcher";

const AddFood = () => {
  const { data, error } = useSWR(
    [
      "/api/food",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  return (
    <Layout>
      <Box px={16} py={12}>
        <Breadcrumb fontSize="xl">
          <BreadcrumbItem>
            <BreadcrumbLink>Quản lí</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Thức ăn</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading mt={10} mb={5}>
          Lich sử nhập thức ăn
        </Heading>
        {data && data.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày nhập</Th>
              <Th>Tên thức ăn</Th>
              <Th>Hình ảnh</Th>
              <Th>Số lượng(kg)</Th>
              <Th>Ngày sản xuất</Th>
              <Th>Hạn sử dụng</Th>
            </Tr>
            {data.map((food) => (
              <Tr>
                <Td>{food.ngayNhap}</Td>
                <Td>{food.tenThucAn}</Td>
                <Td>
                  <Image src={food.hinhAnh[0]} height="5rem" />
                </Td>
                <Td>{food.soLuong}</Td>
                <Td>{food.ngaySanXuat}</Td>
                <Td>{food.hanSuDung}</Td>
              </Tr>
            ))}
          </Table>
        ) : (
          "Empty"
        )}
      </Box>
    </Layout>
  );
};

export default AddFood;
