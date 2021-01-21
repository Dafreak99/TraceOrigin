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
const { Option } = Select;

const Modify = () => {
  const router = useRouter();

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const currentDate = format(new Date(), "dd/MM/yyyy");

  const [ngayNhap, setNgayNhap] = useState(currentDate);
  const [ngaySanXuat, setNgaySanXuat] = useState(currentDate);
  const [hanSuDung, setHanSuDung] = useState(currentDate);

  const [generalData, setGeneralData] = useState(null);

  const [cachBaoQuan, setCachBaoQuan] = useState(null);

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/medicine/${router.query.id}`,
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
      setCachBaoQuan(data.cachBaoQuan);
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
      let res = await fetch(`/api/medicine/${router.query.id}`, {
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
    reset();
    setIsSave(false);

    router.back();
  };

  const onChange = (e) => {
    setGeneralData({ ...generalData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <Box px={16} py={12} as="form" onSubmit={handleSubmit(onSubmit)}>
        {generalData && (
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

                <Heading>Chỉnh sửa thông tin thuốc</Heading>
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
                <FormLabel htmlFor="ngayNhap">Ngày nhập: </FormLabel>
                <br />
                <DatePicker
                  control={control}
                  name="ngayNhap"
                  placeholder={ngayNhap}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="tenThucAn">Tên thuốc</FormLabel>
                <Input
                  type="text"
                  id="tenThuoc"
                  name="tenThuoc"
                  onChange={onChange}
                  value={generalData.tenThuoc}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="donViCungCapThuoc">
                  Tên người/cửa hàng cung cấp thuốc:{" "}
                </FormLabel>
                <Input
                  type="text"
                  id="donViCungCapThuoc"
                  name="donViCungCapThuoc"
                  onChange={onChange}
                  value={generalData.donViCungCapThuoc}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="diaChiDonViCungCapThuoc">
                  Địa chỉ đơn vị cung cấp thuốc:{" "}
                </FormLabel>
                <Input
                  type="text"
                  id="diaChiDonViCungCapThuoc"
                  name="diaChiDonViCungCapThuoc"
                  onChange={onChange}
                  value={generalData.diaChiDonViCungCapThuoc}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="soLuong">Số lượng(kg): </FormLabel>
                <Input
                  type="number"
                  id="soLuong"
                  name="soLuong"
                  onChange={onChange}
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
                <FormLabel htmlFor="cachBaoQuan">Cách bảo quản</FormLabel>

                <Controller
                  name="cachBaoQuan"
                  defaultValue="Tủ lạnh"
                  control={control}
                  rules={{ required: true }}
                  render={({ onChange }) => (
                    <Select
                      defaultValue="Tủ lạnh"
                      onChange={onChange}
                      style={{ width: "100%" }}
                    >
                      <Option value="Tủ lạnh">Tủ lạnh</Option>
                      <Option value="Trong kho">Trong kho</Option>
                    </Select>
                  )}
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
