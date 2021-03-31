import { Box, Grid, Heading, Image, Text } from "@chakra-ui/core";
import { AiFillControl, AiOutlineQrcode } from "react-icons/ai";
import { FaRegStickyNote } from "react-icons/fa";
import { GiPencil } from "react-icons/gi";
import SectionPadding from "./SectionPadding";

const Features = () => {
  return (
    <SectionPadding>
      <>
        <Heading
          className="heading"
          marginBottom="10rem"
          fontSize={{ base: "xl", xl: "4xl" }}
          fontFamily="Nunito, sans-serif"
          color="#373535"
        >
          Tính Năng Của TraceOrigin
        </Heading>
        <Image className="blob feature" src="/blob/1.svg" />
        <div className="container">
          <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            columnGap={{ base: 0, xl: 16 }}
            rowGap={16}
          >
            <Box
              gridColumn={{ base: "span 12", xl: " span 3" }}
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              padding="60px 40px"
              textAlign="center"
            >
              <Box
                as={AiOutlineQrcode}
                height="60px"
                width="60px"
                margin="0 auto"
                mb={8}
                color="#007bff"
              />
              <Heading fontSize="md" mb={6} fontWeight="bold" fontSize="xl">
                Quản lý nguồn gốc
              </Heading>
              <Text
                fontSize="md"
                letterSpacing="0.3px"
                color="#2e2e2fab"
                fontWeight="600"
              >
                TraceOrigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà
                cung cấp tới tay người tiêu dùng .
              </Text>
            </Box>
            <Box
              gridColumn={{ base: "span 12", xl: " span 3" }}
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              padding="60px 40px"
              textAlign="center"
            >
              <Box
                as={FaRegStickyNote}
                height="60px"
                width="60px"
                margin="0 auto"
                mb={8}
                color="#007bff"
              />
              <Heading fontSize="md" mb={6} fontWeight="bold" fontSize="xl">
                Thông tin ghi chép
              </Heading>
              <Text
                fontSize="md"
                letterSpacing="0.3px"
                color="#2e2e2fab"
                fontWeight="600"
              >
                Thông tin ghi chép đầy đủ, đa dạng cho phép người dùng có thể
                nắm được mọi thông tin về sản phẩm .
              </Text>
            </Box>
            <Box
              gridColumn={{ base: "span 12", xl: " span 3" }}
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              padding="60px 40px"
              textAlign="center"
            >
              <Box
                as={AiFillControl}
                height="60px"
                width="60px"
                margin="0 auto"
                mb={8}
                color="#007bff"
              />
              <Heading fontSize="md" mb={6} fontWeight="bold" fontSize="xl">
                Kiểm soát chất lượng
              </Heading>
              <Text
                fontSize="md"
                letterSpacing="0.3px"
                color="#2e2e2fab"
                fontWeight="600"
              >
                Traceorigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà
                cung cấp tới tay người tiêu dùng .
              </Text>
            </Box>
            <Box
              gridColumn={{ base: "span 12", xl: " span 3" }}
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              padding="60px 40px"
              textAlign="center"
            >
              <Box
                as={GiPencil}
                height="60px"
                width="60px"
                margin="0 auto"
                mb={8}
                color="#007bff"
              />
              <Heading mb={6} fontWeight="bold" fontSize="xl">
                Ghi Chép Nhật Ký
              </Heading>
              <Text
                fontSize="md"
                letterSpacing="0.3px"
                color="#2e2e2fab"
                fontWeight="600"
              >
                Traceorigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà
                cung cấp tới tay người tiêu dùng .
              </Text>
            </Box>
          </Grid>
        </div>
      </>
    </SectionPadding>
  );
};

export default Features;
