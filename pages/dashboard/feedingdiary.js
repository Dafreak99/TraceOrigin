import { Box, Heading, Image } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "../../components/Table";
import { FaTrash } from "react-icons/fa";

const feedingdiary = ({ data }) => {
  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mb={8}>Nhật ký cho ăn</Heading>
        {data && data.length > 0 && (
          <Table>
            <Tr>
              <Th>Ngày cho ăn</Th>
              <Th>Tên thức ăn</Th>
              <Th>Hình ảnh</Th>
              <Th>Khối lượng(kg)</Th>
              <Th>Ghi chú</Th>
              <Th>Tên Ao</Th>
              <Th>{""}</Th>
            </Tr>
            {data.map(
              (
                {
                  ngayThangNam,
                  khoiLuong,
                  ghiChu,
                  thucAn: { tenThucAn, hinhAnh },
                  ao: { tenAo },
                },
                i
              ) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./medicine/${_id}`)}
                >
                  <Td>{ngayThangNam}</Td>
                  <Td>{tenThucAn}</Td>
                  <Td>
                    <Image src={hinhAnh[0]} height="5rem" />
                  </Td>
                  <Td>{khoiLuong}</Td>
                  <Td>{ghiChu}</Td>
                  <Td>{tenAo}</Td>
                  <Td
                    borderLeft="1px solid #e8eef3"
                    px={8}
                    onClick={(e) => {
                      e.stopPropagation();
                      // setIsOpen(true);
                      // setId(_id);
                    }}
                  >
                    <Box as={FaTrash}></Box>
                  </Td>
                </Tr>
              )
            )}
          </Table>
        )}
      </Box>
    </Layout>
  );
};

export async function getStaticProps() {
  // TODO: Big bug. Cannot populate
  let res = await fetch("http://localhost:3000/api/feedingdiary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    },
  });

  let data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default feedingdiary;
