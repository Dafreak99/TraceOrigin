import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
} from "@chakra-ui/core";
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

const Index = () => {
  const router = useRouter();

  const [isSave, setIsSave] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const { handleSubmit, register, errors, control, reset } = useForm();

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

    values.hinhAnh = urls;
    values.trongLuong = +values.trongLuong;
    values.productId = data.product._id;
    values.pond = data.pond._id;

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
    } catch (error) {
      console.log(error.message);
      message.error("Lỗi !");
    }

    setIsSave(false);

    message.success("Thu hoạch thành công. Chờ phê duyệt !");

    router.push("/farm/product");
  };

  return (
    <Layout>
      <Box px={16} py={12} as="form" onSubmit={handleSubmit(onSubmit)}>
        {data && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Flex alignItems="center">
                <BackButton />
                <Breadcrumb fontSize="xl" color="#485B6D">
                  <BreadcrumbItem>
                    <BreadcrumbLink>Thu hoạch sản phẩm</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{data.product.tenSanPham}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
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
                <FormLabel htmlFor="ngayThuHoach">Ngày thu hoạch: </FormLabel>
                <br />
                <DatePicker control={control} name="ngayThuHoach" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="trongLuong">Trọng lượng: </FormLabel>
                <Input
                  type="number"
                  id="trongLuong"
                  name="trongLuong"
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="trongLuong">Đơn vị: </FormLabel>
                <Controller
                  name="donvi"
                  defaultValue="KG"
                  control={control}
                  rules={{ required: true }}
                  render={({ onChange }) => (
                    <Select
                      defaultValue="KG"
                      onChange={onChange}
                      style={{ width: "100%" }}
                    >
                      <Option value="KG">KG</Option>
                      <Option value="G">G</Option>
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="hinhAnh">Hình ảnh: </FormLabel>
                <UploadPreview
                  files={files}
                  setFiles={setFiles}
                  fileUrls={fileUrls}
                  setFileUrls={setFileUrls}
                />
              </FormControl>
            </Grid>
            <Grid
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
                      {data.pond.seed.ngayThaGiong}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Số lượng:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.pond.seed.soLuongConGiong}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Ngày tuổi của giống:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.pond.seed.ngayTuoiGiong}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Tên trại giống:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.pond.seed.traiGiong.tenTraiGiong}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Địa chỉ trại giống:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.pond.seed.traiGiong.diaChiTraiGiong}
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
                      {data.pond.tenAo}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Mã ao:{" "}
                    <Box as="span" fontWeight="normal">
                      {data.pond.maAo}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="bold">
                    Diện tích ao (hecta):{" "}
                    <Box as="span" fontWeight="normal">
                      {data.pond.dienTich}
                    </Box>
                  </Text>
                </ListItem>
              </List>
            </Grid>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
