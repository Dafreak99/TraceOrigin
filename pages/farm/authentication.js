import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import BackButton from "@/components/dashboard/BackButton";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("react-lightbox-component"));

const Index = () => {
  const { data, error } = useSWR(
    [
      "/api/enterpriseauthentication/detail",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data !== undefined) {
      const imgs = data.images.map((img) => ({
        src: img,
        title: "abc",
        description: "abc",
      }));

      setImages(imgs);
    }
  }, [data]);

  return (
    <Layout>
      <Box px={16} py={12}>
        <Flex alignItems="center" mb={8}>
          <BackButton />
          <Heading>Hình ảnh chứng thực của cơ sở</Heading>
        </Flex>

        <Box
          padding="3rem 4rem"
          boxShadow="0 0px 20px rgb(167 183 219 / 10%)"
          background="#fff"
        >
          <Lightbox
            images={images}
            thumbnailWidth="150px"
            thumbnailHeight="150px"
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Index;
