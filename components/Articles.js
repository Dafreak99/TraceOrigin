import { Box, Grid, Heading, Image as Img, Text } from "@chakra-ui/react";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
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
      <Img
        src="/blob/3.svg"
        className="blob article"
        layout="fill"
        width="50%"
      />

      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        className="container"
        columnGap={{ base: 0, xl: 16 }}
        rowGap={16}
      >
        {data?.length > 0 ? (
          data.map(({ name, image, _id }) => (
            <Link href={`/posts/${_id}`}>
              <Box
                gridColumn={{ base: "span 12", xl: " span 3" }}
                background="#fff"
                borderRadius="3px"
                boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
                textAlign="center"
                cursor="pointer"
              >
                <a>
                  <Box minH="350px" maxH="350px" w="100%" position="relative">
                    <Image src={image} layout="fill" className="objectfit" />
                  </Box>
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
                      TraceOrigin là cầu nối uy tín đảm bảo xác thực hàng hóa
                      của nhà cung cấp tới tay người tiêu dùng .
                    </Text>
                  </Box>
                </a>
              </Box>
            </Link>
          ))
        ) : (
          <Skeleton active style={{ gridColumn: "span 12" }} />
        )}
      </Grid>
    </SectionPadding>
  );
};

export default Articles;
