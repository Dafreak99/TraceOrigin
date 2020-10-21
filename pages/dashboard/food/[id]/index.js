import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/core";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

import Layout from "@/components/dashboard/Layout";

const Index = ({
  data: {
    tenThucAn,
    donViCungCapThucAn,
    ngayNhap,
    ngaySanXuat,
    hanSuDung,
    soLuong,
    hinhAnh,
  },
}) => {
  const router = useRouter();
  console.log(router.query);
  return (
    <Layout>
      <Box px={16} py={12}>
        <Flex alignItems="center" justify="space-between">
          <Flex>
            <Box
              as={BiArrowBack}
              mr={8}
              color="gray.500"
              onClick={() => router.push("/dashboard/food")}
            />
            <Heading size="xl" fontWeight="medium" color="gray.800">
              Thức ăn / {tenThucAn}
            </Heading>
          </Flex>
          <Button
            backgroundColor="gray.600"
            color="#fff"
            type="submit"
            onClick={() =>
              router.push(`/dashboard/food/${router.query.id}/modify`)
            }
          >
            Chỉnh sửa thông tin
          </Button>
        </Flex>

        <List spacing={2} mt={12}>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Tên thức ăn:{" "}
              <Box as="span" fontWeight="normal">
                {tenThucAn}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Đơn vị cung cấp thức ăn:{" "}
              <Box as="span" fontWeight="normal">
                {donViCungCapThucAn}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Ngày sản xuất:{" "}
              <Box as="span" fontWeight="normal">
                {ngaySanXuat}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Ngày nhập:{" "}
              <Box as="span" fontWeight="normal">
                {ngayNhap}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Ngày hết hạn:{" "}
              <Box as="span" fontWeight="normal">
                {hanSuDung}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Số lượng:{" "}
              <Box as="span" fontWeight="normal">
                {soLuong} kg
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Hình ảnh:
            </Text>
            <Image src={hinhAnh[0]} height="30rem" mt={6} />
          </ListItem>
        </List>
      </Box>
    </Layout>
  );
};

export async function getStaticPaths() {
  // http://locahost:3000/api/food
  let res = await fetch("https://traceorigin.vercel.app/api/food", {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    },
  });
  let data = await res.json();

  let paths = data.map((food) => ({ params: { id: food._id, data: food } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let res = await fetch(
    `https://traceorigin.vercel.app/api/food/${params.id}`,
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
      },
    }
  );

  let data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Index;
