import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

import Layout from "@/components/dashboard/Layout";
import UploadPreview from "@/components/dashboard/UploadPreview";
import DatePicker from "@/components/DatePicker";
import useSWR from "swr";
import FormControl from "@/components/dashboard/FormControl";
import BackButton from "@/components/dashboard/BackButton";
import { message, Select } from "antd";
import { format } from "date-fns";
import { AiFillInfoCircle } from "react-icons/ai";
import Map from "@/components/Map";

const Index = () => {
  const router = useRouter();

  const [isSave, setIsSave] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const { data } = useSWR(
    [
      router.query.id ? `/api/product/harvest/${router.query.id}` : null,
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

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

    values.images = urls;

    values.productId = router.query.id;

    try {
      await fetch("/api/product/harvest", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      setIsSave(false);

      message.success("Thu hoạch thành công. Chờ phê duyệt !");

      router.push("/farm/product");
    } catch (error) {
      console.log(error.message);
      message.error("Lỗi !");
    }
  };

  return (
    <Layout>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        {data && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Flex alignItems="center">
                <BackButton />
                <Heading fontSize="lg">Thu hoạch sản phẩm</Heading>
              </Flex>
              {isSave ? (
                <Button backgroundColor="gray.400" color="#fff">
                  <Spinner mr={4} /> Đang lưu
                </Button>
              ) : (
                <Button type="submit" backgroundColor="#007bff" color="#fff">
                  Tiến hành
                </Button>
              )}
            </Flex>

            <Flex justify="space-between" flexWrap="wrap">
              <Grid
                gridTemplateColumns="repeat(2, 1fr)"
                columnGap={12}
                background="#fff"
                borderRadius="3px"
                boxShadow="0 4px 10px rgba(0,0,0,.1)"
                padding="2rem 3rem"
                mt="2rem"
                width="800px"
                max-width="800px"
              >
                <Flex
                  align="center"
                  gridColumn="span 2"
                  fontSize="lg"
                  mb="1.5rem"
                  color="#76787d"
                >
                  <Box as={AiFillInfoCircle} />
                  <Heading fontSize="md" ml="5px" color="#76787d">
                    Thông tin sản phẩm
                  </Heading>
                </Flex>

                <FormControl>
                  <FormLabel htmlFor="name">Tên sản phẩm: </FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name", { required: "Required" })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="harvestedDate">
                    Ngày thu hoạch:{" "}
                  </FormLabel>
                  <DatePicker control={control} name="harvestedDate" />
                  {errors.harvestedDate?.type === "required" && (
                    <Text fontSize="md" fontStyle="italic" color="red.300">
                      Vui lòng nhập ngày
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="weight">Khối lượng(KG): </FormLabel>
                  <Input
                    type="number"
                    id="weight"
                    name="weight"
                    {...register("weight", { required: "Required" })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="weight">Quy cách đóng gói: </FormLabel>
                  <Controller
                    name="packingMethod"
                    defaultValue="Sơ chế, đóng gói bằng túi PE, đựng trong thùng xốp. Có dán giấy decal thể hiện logo và thông tin của công ty"
                    control={control}
                    rules={{ required: true }}
                    render={({ onChange }) => (
                      <Select
                        size="large"
                        defaultValue="Sơ chế, đóng gói bằng túi PE, đựng trong thùng xốp. Có dán giấy decal thể hiện logo và thông tin của công ty"
                        onChange={onChange}
                        style={{ width: "100%" }}
                      >
                        <Option value="Sơ chế, đóng gói bằng túi PE, đựng trong thùng xốp. Có dán giấy decal thể hiện logo và thông tin của công ty">
                          Quy cách chung
                        </Option>
                      </Select>
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="note">Ghi chú: </FormLabel>
                  <Input
                    type="text"
                    id="note"
                    name="note"
                    {...register("note", { required: "Required" })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="images">Hình ảnh: </FormLabel>
                  <UploadPreview
                    files={files}
                    setFiles={setFiles}
                    fileUrls={fileUrls}
                    setFileUrls={setFileUrls}
                  />
                </FormControl>
              </Grid>

              {/* Below Section */}
              <Grid
                h="max-content"
                gridTemplateColumns="repeat(2, 1fr)"
                columnGap={12}
                background="#fff"
                borderRadius="3px"
                boxShadow="0 4px 10px rgba(0,0,0,.1)"
                padding="2rem 3rem"
                mt="2rem"
              >
                <List spacing={2}>
                  <Heading size="md" mt={4} mb={4}>
                    Thông tin con giống
                  </Heading>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày thả giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.stockingDate}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Mật độ thả:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.stockingDensity} (con/m2)
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Ngày tuổi của giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.seedAge}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.hatchery.name}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Địa chỉ trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.seed.hatchery.address}
                      </Box>
                    </Text>
                  </ListItem>
                </List>
                <List spacing={2}>
                  <Heading size="md" mb={4} mt={4}>
                    Thông tin về ao nuôi
                  </Heading>
                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Tên ao:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.name}
                      </Box>
                    </Text>
                  </ListItem>

                  <ListItem>
                    <Text fontSize="md" fontWeight="bold">
                      Diện tích ao:{" "}
                      <Box as="span" fontWeight="normal">
                        {data.pond.area} (m2)
                      </Box>
                    </Text>
                  </ListItem>
                </List>
              </Grid>
              {/* End Below Section */}
            </Flex>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
