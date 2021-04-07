import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";
import useSWR from "swr";
import { BiArrowBack } from "react-icons/bi";
import { format } from "date-fns";

import Layout from "@/components/dashboard/Layout";
import UploadPreview from "@/components/dashboard/UploadPreview";
import DatePicker from "@/components/DatePicker";
import fetcher from "@/utils/fetcher";
import FormControl from "@/components/dashboard/FormControl";
import dynamic from "next/dynamic";
const { Option } = Select;

const Editor = dynamic(() => import("@/components/dashboard/Editor"), {
  ssr: false,
});

const Modify = () => {
  const router = useRouter();

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const currentDate = format(new Date(), "dd/MM/yyyy");

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/post/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      if (data.image) {
        setFiles(Array(1).fill(""));

        setFileUrls([data.image]);
      }
    }
  }, [data]);

  const onSubmit = async (values) => {
    setIsSave(true);

    values._id = router.query.id;

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
      let res = await fetch(`/api/post`, {
        method: "PUT",
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

    setFiles([]);
    setFileUrls([]);
    reset();
    setIsSave(false);

    router.back();
  };

  return (
    <Layout>
      <Box px={16} py={12} as="form" onSubmit={handleSubmit(onSubmit)}>
        {data && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Flex alignItems="center">
                <Flex
                  justify="center"
                  align="center"
                  height="50px"
                  width="50px"
                  background="#c9e3fe45"
                  borderRadius="50%"
                  mr={8}
                  cursor="pointer"
                >
                  <Box
                    height="32px"
                    width="32px"
                    as={BiArrowBack}
                    color="#4386e8"
                    onClick={() => router.back()}
                  />
                </Flex>

                <Heading>Chỉnh sửa thông tin thủy sản</Heading>
              </Flex>
              {isSave ? (
                <Button backgroundColor="gray.400" color="#fff">
                  <Spinner mr={4} /> Đang lưu
                </Button>
              ) : (
                <Button type="submit" backgroundColor="#098efc" color="#fff">
                  Lưu thông tin
                </Button>
              )}
            </Flex>

            <Grid
              gridTemplateColumns="repeat(2, 1fr)"
              columnGap={12}
              background="#fff"
              borderRadius="3px"
              boxShadow="0 4px 10px rgba(0,0,0,.1)"
              padding="2rem 3rem"
              mt="2rem"
            >
              <FormControl>
                <FormLabel htmlFor="name">Tên thủy sản</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={data.name}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>

              <FormControl>
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
                      <Option value="ca-nuoc-ngot">Cá nước ngọt</Option>
                      <Option value="ca-bien">Cá biển</Option>
                      <Option value="giap-xac">Giáp xác</Option>
                      <Option value="nhuyen-the">Nhuyễn Thể Chân Đầu</Option>
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl gridColumn="span 2">
                <FormLabel>Hình ảnh thức ăn</FormLabel>
                <UploadPreview
                  files={files}
                  setFiles={setFiles}
                  fileUrls={fileUrls}
                  setFileUrls={setFileUrls}
                />
              </FormControl>
              <FormControl gridColumn="span 2">
                <FormLabel htmlFor="description">Mô tả</FormLabel>
                <Controller
                  name="description"
                  defaultValue={data.description}
                  control={control}
                  rules={{ required: true }}
                  render={({ onChange }) => (
                    <Editor onChange={onChange} data={data.description} />
                  )}
                />
              </FormControl>
            </Grid>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Modify;
