import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import useSWR from "swr";

import fetcher from "@/utils/fetcher";

import Layout from "@/components/dashboard/Layout";
import UploadPreview from "@/components/dashboard/UploadPreview";
import DatePicker from "@/components/DatePicker";

const Modify = () => {
  const router = useRouter();

  console.log(router.query);

  const { data, error } = useSWR(
    [
      `/api/food/${router.query.id}`,
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  let value = data || {};

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  const [ngayNhap, setNgayNhap] = useState(
    value.ngayNhap || format(new Date(), "dd/MM/yyyy")
  );
  const [ngaySanXuat, setNgaySanXuat] = useState(
    value.ngaySanXuat || format(new Date(), "dd/MM/yyyy")
  );
  const [hanSuDung, setHanSuDung] = useState(
    value.hanSuDung || format(new Date(), "dd/MM/yyyy")
  );

  // if (!value) return <h3>Loading...</h3>;

  let a = [],
    b = [];

  if (value.hinhAnh) {
    a = Array(value.hinhAnh.length).fill("");
    b = value.hinhAnh;
  }

  const [files, setFiles] = useState(a);
  const [fileUrls, setFileUrls] = useState(b);

  const onSubmit = async (values) => {
    setIsSave(true);
    values.ngayNhap = ngayNhap;
    values.ngaySanXuat = ngaySanXuat;
    values.hanSuDung = hanSuDung;
    values._id = _id;

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

    try {
      let res = await fetch("/api/food/modify", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
    }

    setFiles([]);
    setFileUrls([]);

    setIsSave(false);

    router.back();
  };

  console.log(fileUrls);
  // TODO:// Why fileUrls is empty

  return (
    <Layout>
      <Box px={16} py={12} as="form" onSubmit={handleSubmit(onSubmit)}>
        {value && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Heading>Chỉnh sửa thông tin thức ăn</Heading>
              {isSave ? (
                <Button backgroundColor="gray.400" color="#fff">
                  <Spinner mr={4} /> Đang lưu
                </Button>
              ) : (
                <Button type="submit">Lưu thông tin</Button>
              )}
            </Flex>

            <Grid gridTemplateColumns="repeat(2, 1fr)" columnGap={12}>
              <FormControl>
                <FormLabel htmlFor="ngayNhap">Ngày tháng năm: </FormLabel>
                <DatePicker
                  selectedDate={ngayNhap}
                  setSelectedDate={setNgayNhap}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="tenThucAn">Tên thức ăn</FormLabel>
                <Input
                  type="text"
                  id="tenThucAn"
                  name="tenThucAn"
                  defaultValue={value.tenThucAn}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="donViCungCapThucAn">
                  Tên người/cửa hàng đại lý thức ăn:{" "}
                </FormLabel>
                <Input
                  type="text"
                  id="donViCungCapThucAn"
                  name="donViCungCapThucAn"
                  defaultValue={value.donViCungCapThucAn}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="soLuong">Số lượng(kg): </FormLabel>
                <Input
                  type="text"
                  id="soLuong"
                  name="soLuong"
                  defaultValue={value.soLuong}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="ngaySanXuat">Ngày sản xuất</FormLabel>
                <DatePicker
                  selectedDate={ngaySanXuat}
                  setSelectedDate={setNgaySanXuat}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="hanSuDung">Hạn sử dụng</FormLabel>
                <DatePicker
                  selectedDate={hanSuDung}
                  setSelectedDate={setHanSuDung}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Hình ảnh thức ăn</FormLabel>
                <UploadPreview
                  files={files}
                  setFiles={setFiles}
                  fileUrls={fileUrls}
                  setFileUrls={setFileUrls}
                />
              </FormControl>
            </Grid>
          </>
        )}
      </Box>
    </Layout>
    // <h3>Modi</h3>
  );
};

export default Modify;
