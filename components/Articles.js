import { Box, Grid, Heading, Image, Text } from "@chakra-ui/core";

import SectionPadding from "./SectionPadding";

const Articles = ({ data }) => {
  return (
    <SectionPadding>
      <Heading
        className="heading"
        marginBottom={16}
        fontSize={{ base: "xl", xl: "4xl" }}
        fontFamily="Nunito, sans-serif"
        color="#373535"
      >
        Bài viết
      </Heading>
      <Image src="/blob/3.svg" className="blob article" />

      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        className="container"
        columnGap={{ base: 0, xl: 16 }}
        rowGap={16}
      >
        <Box
          gridColumn={{ base: "span 12", xl: " span 4" }}
          background="#fff"
          borderRadius="3px"
          boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
          textAlign="center"
        >
          <Image src="/pexels-photo-96379.jpeg" />
          <Box padding="3rem 4rem">
            <Heading
              fontSize="md"
              mb={6}
              fontWeight="bold"
              fontSize="xl"
              marginTop="1rem"
            >
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
        </Box>
        {/* End Article */}
        <Box
          gridColumn={{ base: "span 12", xl: " span 4" }}
          background="#fff"
          borderRadius="3px"
          boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
          textAlign="center"
        >
          <Image src="/pexels-photo-96379.jpeg" />
          <Box padding="3rem 4rem">
            <Heading
              fontSize="md"
              mb={6}
              fontWeight="bold"
              fontSize="xl"
              marginTop="1rem"
            >
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
        </Box>
        {/* End Article */}
        <Box
          gridColumn={{ base: "span 12", xl: " span 4" }}
          background="#fff"
          borderRadius="3px"
          boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
          textAlign="center"
        >
          <Image src="/pexels-photo-96379.jpeg" />
          <Box padding="3rem 4rem">
            <Heading
              fontSize="md"
              mb={6}
              fontWeight="bold"
              fontSize="xl"
              marginTop="1rem"
            >
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
        </Box>
        {/* End Article */}
      </Grid>
    </SectionPadding>
  );
};

export default Articles;
