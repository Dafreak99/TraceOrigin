import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/core";
import { RiSendPlaneFill } from "react-icons/ri";

const Footer = () => {
  return (
    <Box background="#2F4362" padding="100px 70px">
      <Box className="container">
        <Grid gridTemplateColumns="repeat(12,1fr)">
          <Box gridColumn="span 5">
            <Image
              src="/water.svg"
              minH="3rem"
              maxH="3rem"
              maxW="3rem"
              minW="3rem"
            />
            <Heading color="#fff" mt={6} fontSize="xl">
              Khoa CNTT & TT - Đại học Cần Thơ
            </Heading>
            <Text color="#fff" mt={4}>
              Email: haib1704727@student.ctu.edu.vn
            </Text>
          </Box>
          <Box gridColumn="span 3">
            <ul style={{ listStyle: "none" }}>
              <li href="" style={{ marginBottom: "1rem" }}>
                <a style={{ color: "#fff" }}>Giới thiệu</a>
              </li>
              <li href="" style={{ marginBottom: "1rem" }}>
                <a style={{ color: "#fff" }}>Sản phẩm</a>
              </li>
              <li href="" style={{ marginBottom: "1rem" }}>
                <a style={{ color: "#fff" }}>Tin tức</a>
              </li>
              <li href="">
                <a style={{ color: "#fff" }}>Liên hệ</a>
              </li>
            </ul>
          </Box>
          <Box gridColumn="span 4">
            <Heading fontSize="md" fontWeight="md" color="#fff" mb="1rem">
              Nhận tin tức sản phẩm
            </Heading>
            <Box position="relative">
              <Input />
              <Button position="absolute" top="0" right="0" zIndex="100">
                <Box as={RiSendPlaneFill} />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
