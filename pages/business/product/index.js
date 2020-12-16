import { Alert, AlertIcon, Badge, Box, Heading, Image } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { Table, Td, Th, Tr } from "@/components/Table";
import { FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import { AiFillCheckCircle } from "react-icons/ai";
const Product = () => {
  const { data, error } = useSWR("/api/business", fetcher);

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <Heading mt={10} mb={5}>
          Sản phẩm chờ duyệt
        </Heading>

        {data && data?.product && data.product.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày thu hoạch</Th>
              <Th>Tên sản phẩm</Th>
              <Th>Hình ảnh</Th>
              <Th>Trọng lượng</Th>
              <Th>Đơn vị</Th>
              <Th>Trạng thái</Th>
              <Th>{""}</Th>
            </Tr>
            {data.product.map(
              (
                { donvi, ngayThuHoach, tenSanPham, trongLuong, hinhAnh, _id },
                i
              ) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  // onClick={() => router.push(`./medicine/${_id}`)}
                >
                  <Td>{format(new Date(ngayThuHoach), "dd/MM/yyyy")}</Td>

                  <Td>{tenSanPham}</Td>
                  <Td>
                    <Image src={hinhAnh[0]} height="5rem" />
                  </Td>
                  <Td>{trongLuong}</Td>
                  <Td>{donvi}</Td>
                  <Td>
                    <Badge p="5px 10px" borderRadius="3px">
                      Pending
                    </Badge>
                  </Td>

                  <Td
                    borderLeft="1px solid #e8eef3"
                    px={8}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true);
                      setId(_id);
                    }}
                  >
                    <Box as={AiFillCheckCircle} size="32px"></Box>
                  </Td>
                </Tr>
              )
            )}
          </Table>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            Chưa nhập thuốc
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Product;
