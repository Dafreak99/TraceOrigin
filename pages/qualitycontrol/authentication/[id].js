import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import RejectMessageModal from "@/components/dashboard/RejectMessageModal";
import fetcher from "@/utils/fetcher";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Popconfirm } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import useSWR from "swr";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const [images, setImages] = useState([]);

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/enterpriseauthentication/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      let imgs = data.authentication.images.map((each) => ({
        src: each,
        description: "Images",
      }));
      setImages(imgs);
    }
  }, [data]);

  const Iframe = (props) => {
    return (
      <div
        style={{
          boxShadow: "0 10px 20px rgba(0,0,0,.1)",
          height: "min-content",
        }}
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
      />
    );
  };

  const onApprove = async () => {
    await fetch(`/api/enterpriseauthentication/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ farmId: router.query.id }),
    });

    router.back();
  };

  return (
    <Layout>
      <Box>
        <Flex alignItems="center" justify="space-between">
          <Flex align="center">
            <BackButton />
            <Heading fontSize="xl">{data && data.name}</Heading>
          </Flex>
          <Box>
            <Popconfirm
              title="Bạn có chắc là sẽ duyệt chứng thực cơ sở này?"
              onConfirm={onApprove}
              okText="Yes"
              cancelText="No"
            >
              <Button
                background="#88fcb62b"
                color="#22a669"
                mr="10px"
                leftIcon={<AiOutlineCheck />}
                _hover={{ background: "88fcb62b" }}
              >
                Duyệt
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Bạn có chắc là sẽ không duyệt chứng thực cơ sở này?"
              onConfirm={onOpen}
              okText="Yes"
              cancelText="No"
            >
              <Button
                background="#fc88882b"
                color="#a62222"
                leftIcon={<AiOutlineClose />}
                _hover={{ background: "fc88882b" }}
              >
                Từ chối
              </Button>
              <RejectMessageModal
                isOpen={isOpen}
                onClose={onClose}
                type="authentication"
                farmId={router.query.id}
              />
            </Popconfirm>
          </Box>
        </Flex>
        <Grid gridTemplateColumns="repeat(12,1fr)" gridColumnGap="3rem">
          <Flex paddingTop={12} gridColumn="span 4">
            {data ? (
              <>
                <List
                  spacing={2}
                  px={16}
                  py={12}
                  width="100%"
                  boxShadow="0 4px 10px rgba(0,0,0,.1)"
                  marginRight="2rem"
                  background="#fff"
                >
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      {data.name}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Image
                      src={data.images[0]}
                      height="10rem"
                      width="15rem"
                      objectFit="contain"
                      borderRadius="3px"
                      mt="2rem"
                      mb="1rem"
                    />
                  </ListItem>

                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Họ và tên chủ cơ sở:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.owner}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Loại tài khoản:{" "}
                      <Box as="span" fontWeight="normal">
                        Nông dân
                      </Box>
                    </Text>
                  </ListItem>

                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Diện tích trang trại:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.area}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ trang trại:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.address}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      SĐT liên hệ:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.phone}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Fax:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.fax}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Website:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.website}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Email:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.email}
                      </Box>
                    </Text>
                  </ListItem>
                </List>
                <Iframe iframe={data.map} />
              </>
            ) : (
              <Flex justify="center" align="center">
                <Spinner />
              </Flex>
            )}
          </Flex>
          <Box mt="3rem" gridColumn="span 8">
            <Heading fontSize="md">Hình ảnh pháp lý</Heading>
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
        </Grid>
      </Box>
    </Layout>
  );
};

export default Index;
