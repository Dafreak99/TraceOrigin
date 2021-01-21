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
  Text,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Layout from "@/components/dashboard/Layout";
import UploadPreview from "@/components/dashboard/UploadPreview";
import DatePicker from "@/components/DatePicker";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import FormControl from "@/components/dashboard/FormControl";
import BackButton from "@/components/dashboard/BackButton";

const Modify = () => {
  const router = useRouter();

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const [ngayNhap, setNgayNhap] = useState(null);
  const [ngaySanXuat, setNgaySanXuat] = useState(null);
  const [hanSuDung, setHanSuDung] = useState(null);

  const [generalData, setGeneralData] = useState(null);

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/food/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setGeneralData(data);
      setNgayNhap(data.ngayNhap);
      setNgaySanXuat(data.ngaySanXuat);
      setHanSuDung(data.hanSuDung);

      if (data.hinhAnh) {
        setFiles(Array(data.hinhAnh.length).fill(""));
        setFileUrls(data.hinhAnh);
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

    values.hinhAnh = urls;

    try {
      let res = await fetch(`/api/food/${router.query.id}`, {
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

    setFiles([]);
    setFileUrls([]);

    setIsSave(false);

    router.back();
  };

  return (
    <Layout>
      <Box px={16} py={12} as="form" onSubmit={handleSubmit(onSubmit)}>
        {generalData && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Flex alignItems="center">
                <BackButton />
                <Heading>Chỉnh sửa thông tin thức ăn</Heading>
              </Flex>
              {isSave ? (
                <Button backgroundColor="gray.400" color="#fff">
                  <Spinner mr={4} /> Đang lưu
                </Button>
              ) : (
                <Button type="submit" backgroundColor="#007bff" color="#fff">
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
                <FormLabel htmlFor="ngayNhap">Ngày nhập: </FormLabel>
                <br />
                <DatePicker
                  control={control}
                  name="ngayNhap"
                  placeholder={ngayNhap}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="tenThucAn">Tên thức ăn</FormLabel>
                <Input
                  type="text"
                  id="tenThucAn"
                  name="tenThucAn"
                  value={generalData.tenThucAn}
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
                  value={generalData.donViCungCapThucAn}
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
                  value={generalData.soLuong}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="ngaySanXuat">Ngày sản xuất</FormLabel>
                <br />
                <DatePicker
                  control={control}
                  name="ngaySanXuat"
                  placeholder={ngaySanXuat}
                />
                {errors.ngaySanXuat?.type === "required" && (
                  <Text fontSize="md" fontStyle="italic" color="red.300">
                    Vui lòng nhập ngày
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="hanSuDung">Hạn sử dụng</FormLabel>
                <br />
                <DatePicker
                  control={control}
                  name="hanSuDung"
                  placeholder={hanSuDung}
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
  );
};

export default Modify;
