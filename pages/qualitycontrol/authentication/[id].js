import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  List,
  ListItem,
  ModalFooter,
  Spinner,
  Text,
  Button,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Button as AntdButton, Collapse, Modal, Popconfirm } from "antd";
import useSWR from "swr";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

const { Panel } = Collapse;

const Index = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [isSave, setIsSave] = useState(false);

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

  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  useEffect(() => {
    if (data) {
      let imgs = data.authentication.images.map((each) => ({
        src: each,
        description: "Images",
      }));
      setImages(imgs);
    }
  }, [data]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  const onApprove = async (id) => {
    let res = await fetch(`/api/enterpriseauthentication/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ isAuthenticated: "true", farmId: id }),
    });

    router.back();
  };

  const sendMessage = async (values) => {
    // Change Farm authentication state

    setIsSave(true);
    values.type = "Enterprise Authentication";
    values.farmId = router.query.id;

    try {
      await fetch("/api/rejectmessage", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
    }
    setIsSave(false);

    router.back();
  };

  return (
    <Layout>
      <Box px={16} py={12}>
        <Flex alignItems="center" justify="space-between">
          <Flex align="center">
            <BackButton />
            <Heading fontSize="xl">{data && data.name}</Heading>
          </Flex>
          <Box>
            <Popconfirm
              title="Bạn có chắc sẽ duyệt cơ sở này？"
              okText="Có"
              cancelText="Không"
              onConfirm={() => onApprove(router.query.id)}
            >
              <AntdButton type="primary">Chấp nhận</AntdButton>
            </Popconfirm>
            <Popconfirm
              title="Bạn có chắc sẽ không duyệt cơ sở này？"
              okText="Có"
              cancelText="Không"
              onConfirm={showModal}
            >
              <AntdButton type="text">Hủy bỏ</AntdButton>
            </Popconfirm>
          </Box>
        </Flex>
        <Box mt="3rem">
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
        <Flex paddingTop={12}>
          {data ? (
            <>
              <List
                spacing={2}
                px={16}
                py={12}
                boxShadow="0 4px 10px rgba(0,0,0,.1)"
                w="max-content"
                h="max-content"
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
      </Box>

      <Modal
        title={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(sendMessage)}>
          <FormControl>
            <FormLabel htmlFor="message">Lời nhăn</FormLabel>
            <Input
              type="text"
              id="message"
              name="message"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <ModalFooter mt="2rem">
            <Button variantColor="blue" mr={3} onClick={handleCancel}>
              Đóng
            </Button>
            {isSave ? (
              <Button backgroundColor="gray.400" color="#fff">
                <Spinner mr={4} /> Đang lưu
              </Button>
            ) : (
              <Button variant="ghost" type="submit">
                Lưu
              </Button>
            )}
          </ModalFooter>
        </form>
      </Modal>
    </Layout>
  );
};

export default Index;
