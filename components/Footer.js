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
    <Box background="#2F4362" padding="100px 0px">
      <Box className="container">
        <Grid
          gridTemplateColumns="repeat(12,1fr)"
          rowGap={{ base: "3rem", xl: 0 }}
        >
          <Box gridColumn={{ base: "span 12", xl: "span 5" }}>
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
          <Box gridColumn={{ base: "span 12", xl: "span 3" }}>
            <ul style={{ listStyle: "none" }}>
              <li href="" style={{ marginBottom: "1rem" }}>
                <a style={{ color: "#fff", fontSize: "16px" }}>Giới thiệu</a>
              </li>
              <li href="" style={{ marginBottom: "1rem" }}>
                <a style={{ color: "#fff", fontSize: "16px" }}>Sản phẩm</a>
              </li>
              <li href="" style={{ marginBottom: "1rem" }}>
                <a style={{ color: "#fff", fontSize: "16px" }}>Tin tức</a>
              </li>
              <li href="">
                <a style={{ color: "#fff", fontSize: "16px" }}>Liên hệ</a>
              </li>
            </ul>
          </Box>
          <Box gridColumn={{ base: "span 12", xl: "span 4" }}>
            <Heading fontSize="md" fontWeight="md" color="#fff" mb="1rem">
              Nhận tin tức sản phẩm
            </Heading>
            <Box position="relative">
              <Input />
              <Button position="absolute" top="0" right="0" zIndex="2">
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
