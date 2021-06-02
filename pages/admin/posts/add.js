import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";

import Layout from "@/components/dashboard/Layout";
import dynamic from "next/dynamic";
import BackButton from "@/components/dashboard/BackButton";
import { Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import UploadPreview from "@/components/dashboard/UploadPreview";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("@/components/dashboard/Editor"), {
  ssr: false,
});

const { Option } = Select;

const Posts = () => {
  const { register, errors, control, reset, handleSubmit } = useForm();
  const [isSave, setIsSave] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const router = useRouter();

  const onSubmit = async (values) => {
    setIsSave(true);

    let urls = [];

    const uploadImage = async (file) => {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("upload_preset", "traceorigin");
      formdata.append("resource_type", "auto");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dafreak/upload",
        { method: "POST", body: formdata }
      );
      const { secure_url } = await res.json();
      return secure_url;
    };

    // Loop through each image then upload
    for (let i = 0; i < files.length; i++) {
      if (files[i] === "") {
        urls.push(fileUrls[i]);
      } else {
        let data = await uploadImage(files[i]);
        urls.push(data);
      }
    }

    values.image = urls[0];

    try {
      let res = await fetch("/api/post", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      // mutate(
      //   [
      //     "/api/consignment",
      //     // BUSINESS ACCOUNT USER TOKEN
      //     process.browser ? localStorage.getItem("token") : null,
      //     // "eyJhbGciOiJIUzI1NiJ9.NWZkYjFiOWM0MjRkYjUwM2E0OTdjN2Iy.5rpAKpQJ35fR9F_bWwW4vZQc-rRPPqHO_ABVG6Hk9Ao",
      //   ],
      //   async (cachedData) => [...cachedData, data],
      //   false
      // );
    } catch (error) {
      console.log(error.message);
    }

    router.back();
    reset();
    setIsSave(false);
  };
  return (
    <Layout>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box
          background="#fff"
          boxShadow="0 0 20px rgba(0,0,0,.1)"
          padding="2rem 3rem"
          maxW="70rem"
        >
          <Flex justify="space-between" align="center" mb="2rem">
            <Flex alignItems="center">
              <BackButton />
              <Heading>Thêm bài viết</Heading>
            </Flex>

            {isSave ? (
              <Button backgroundColor="gray.400" color="#fff">
                <Spinner mr={4} /> Đang lưu
              </Button>
            ) : (
              <Button backgroundColor="#007bff" color="#fff" type="submit">
                Lưu thông tin
              </Button>
            )}
          </Flex>

          <Grid
            gridTemplateColumns="repeat(12,1fr)"
            mb="2rem"
            gridColumnGap="4rem"
            gridRowGap="1rem"
          >
            <FormControl gridColumn="span 6">
              <FormLabel htmlFor="name">Tên thủy sản</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl gridColumn="span 6">
              <FormLabel htmlFor="type">Sản phẩm</FormLabel>
              <Controller
                name="type"
                control={control}
                defaultValue="Cá biển"
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    size="large"
                    onChange={onChange}
                    style={{
                      display: "block",
                    }}
                    defaultValue="Cá biển"
                  >
                    <Option value="ca-bien">Cá biển</Option>
                    <Option value="giap-xac">Giáp xác</Option>
                    <Option value="ca-nuoc ngot">Cá nước ngọt</Option>
                  </Select>
                )}
              />
            </FormControl>
            <FormControl gridColumn="span 12">
              <FormLabel>Hình ảnh</FormLabel>
              <UploadPreview
                files={files}
                setFiles={setFiles}
                fileUrls={fileUrls}
                setFileUrls={setFileUrls}
              />
            </FormControl>
            <FormControl gridColumn="span 12">
              <FormLabel htmlFor="description">Mô tả</FormLabel>
              <Controller
                name="description"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                render={({ onChange }) => <Editor onChange={onChange} />}
              />
            </FormControl>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Posts;
