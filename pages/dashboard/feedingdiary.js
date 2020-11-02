import { Box, Heading, Image } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "../../components/Table";

const feedingdiary = ({ data }) => {
  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mb={8}>Nhật ký cho ăn</Heading>

        <Table>
          <Tr>
            <Th>Ngày cho ăn</Th>
            <Th>Tên thức ăn</Th>
            <Th>Hình ảnh</Th>
            <Th>Khối lượng cho ăn(kg)</Th>
            <Th>Ghi chú</Th>
            <Th>Tên Ao</Th>
            <Th>{""}</Th>
          </Tr>
        </Table>
      </Box>
    </Layout>
  );
};

export async function getStaticProps() {
  // TODO: Big bug. Cannot populate
  let res = await fetch("https://traceorigin.vercel.app/api/feedingdiary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    },
  });

  let data = await res.json();

  console.log(data);

  return {
    props: {
      data,
    },
  };
}

export default feedingdiary;
