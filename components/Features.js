import { Box, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { AiFillControl, AiOutlineQrcode } from "react-icons/ai";
import { FaDiceD6, FaRegStickyNote } from "react-icons/fa";

import SectionPadding from "./SectionPadding";

const Features = () => {
  const data = [
    {
      icon: AiOutlineQrcode,
      heading: "Quản lý nguồn gốc",
      description:
        "TraceOrigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà cung cấp tới tay người tiêu dùng .",
    },
    {
      icon: FaRegStickyNote,
      heading: "Thông tin ghi chép",
      description:
        "Thông tin ghi chép đầy đủ, đa dạng cho phép người dùng có thể nắm được mọi thông tin về sản phẩm .",
    },
    {
      icon: AiFillControl,
      heading: "Kiểm soát chất lượng",
      description:
        "TraceOrigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà cung cấp tới tay người tiêu dùng .",
    },
    {
      icon: FaDiceD6,
      heading: "Bảo toàn dữ liệu",
      description:
        "TraceOrigin sử dụng công nghệ blockchain để đảm bảo tính bất biến và tính minh mạch của dữ liệu sản phảm .",
    },
  ];

  return (
    <SectionPadding>
      <>
        <Heading
          className="heading"
          marginBottom={{ base: "10rem", sm: "4rem", lg: "6rem", xl: "8rem" }}
          fontSize={{ base: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
          fontFamily="Nunito, sans-serif"
          color="#373535"
        >
          Tính Năng Của TraceOrigin
        </Heading>
        <Image className="blob feature" src="/blob/1.svg" />
        <div className="container">
          <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            columnGap={{ base: 0, lg: 8, xl: 16 }}
            rowGap={16}
          >
            {data.map(({ icon, heading, description }) => (
              <Box
                key={heading}
                gridColumn={{ base: "span 12", lg: "span 6", xl: " span 3" }}
                background="#fff"
                borderRadius="3px"
                boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
                padding="60px 40px"
                textAlign="center"
                borderRadius="30px"
              >
                <Box
                  as={icon}
                  height="60px"
                  width="60px"
                  margin="0 auto"
                  mb={8}
                  color="#007bff"
                />
                <Heading fontSize="md" mb={6} fontWeight="bold" fontSize="xl">
                  {heading}
                </Heading>
                <Text
                  fontSize="md"
                  letterSpacing="0.3px"
                  color="#2e2e2fab"
                  fontWeight="600"
                >
                  {description}
                </Text>
              </Box>
            ))}
          </Grid>
        </div>
      </>
    </SectionPadding>
  );
};

export default Features;
