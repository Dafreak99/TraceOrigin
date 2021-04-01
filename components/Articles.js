import fetcher from "@/utils/fetcher";
import { Box, Grid, Heading, Image, Text } from "@chakra-ui/core";
import useSWR from "swr";
import { Skeleton } from "antd";

import SectionPadding from "./SectionPadding";
import { useRouter } from "next/router";

const Articles = ({ data }) => {
  const router = useRouter();

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
        {data?.length > 0 ? (
          data.map(({ name, image, _id }) => (
            <Box
              gridColumn={{ base: "span 12", xl: " span 4" }}
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              textAlign="center"
              cursor="pointer"
              onClick={() => router.push(`/posts/${_id}`)}
            >
              <Image src={image} minH="350px" maxH="350px" w="100%" />
              <Box padding="3rem 4rem">
                <Heading
                  fontSize="md"
                  mb={6}
                  fontWeight="bold"
                  fontSize="xl"
                  marginTop="1rem"
                >
                  {name}
                </Heading>
                <Text
                  fontSize="md"
                  letterSpacing="0.3px"
                  color="#2e2e2fab"
                  fontWeight="600"
                >
                  TraceOrigin là cầu nối uy tín đảm bảo xác thực hàng hóa của
                  nhà cung cấp tới tay người tiêu dùng .
                </Text>
              </Box>
            </Box>
          ))
        ) : (
          <Skeleton active style={{ gridColumn: "span 12" }} />
        )}
      </Grid>
    </SectionPadding>
  );
};

export default Articles;
