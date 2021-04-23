import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Layout from "@/components/dashboard/Layout";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import BackButton from "@/components/dashboard/BackButton";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

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
      <Box>
        <Flex alignItems="center" mb={8}>
          <BackButton />
          <Heading>Hình ảnh chứng thực của cơ sở</Heading>
        </Flex>

        <Box
          padding="3rem 4rem"
          boxShadow="0 0px 20px rgb(167 183 219 / 10%)"
          background="#fff"
        >
          <SimpleReactLightbox>
            <SRLWrapper
              options={{ settings: { slideTransitionSpeed: 1 } }}
              style={{ marginTop: "30px" }}
            >
              <Flex mt="1rem">
                {images.map((image) => (
                  <Image src={image.src} height="150px" mr="1rem" />
                ))}
              </Flex>
            </SRLWrapper>
          </SimpleReactLightbox>
        </Box>
      </Box>
    </Layout>
  );
};

export default Index;
