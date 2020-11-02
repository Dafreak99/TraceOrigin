import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Layout from "@/components/dashboard/Layout";
import UploadPreview from "@/components/dashboard/UploadPreview";
import DatePicker from "@/components/DatePicker";
import fetcher from "@/utils/fetcher";
import { format } from "date-fns";
import useSWR from "swr";

const Modify = () => {
  const router = useRouter();

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors } = useForm();

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
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
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
    values.ngayNhap = ngayNhap;
    values.ngaySanXuat = ngaySanXuat;
    values.hanSuDung = hanSuDung;
    values._id = router.query.id;
    values.cachBaoQuan = cachBaoQuan;

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

  const onChange = (e) => {
    setGeneralData({ ...generalData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <Box px={16} py={12} as="form" onSubmit={handleSubmit(onSubmit)}>
        {generalData && (
          <>
            <Flex alignItems="center" justify="space-between">
              <Heading>Chỉnh sửa thông tin thuốc</Heading>
              {isSave ? (
                <Button backgroundColor="gray.400" color="#fff">
                  <Spinner mr={4} /> Đang lưu
                </Button>
              ) : (
                <Button type="submit" backgroundColor="gray.600" color="#fff">
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
                <FormLabel htmlFor="ngayNhap">Ngày tháng năm: </FormLabel>
                <DatePicker
                  selectedDate={ngayNhap}
                  setSelectedDate={setNgayNhap}
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
                  type="text"
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
                <FormLabel htmlFor="cachBaoQuan">Cách bảo quản</FormLabel>
                <Select
                  name="cachBaoQuan"
                  onChange={(e) => setCachBaoQuan(e.target.value)}
                >
                  <option
                    value="Trong kho"
                    selected={cachBaoQuan === "Trong kho"}
                  >
                    Trong kho
                  </option>
                  <option value="Tủ lạnh" selected={cachBaoQuan === "Tủ lạnh"}>
                    Tủ lạnh
                  </option>
                </Select>
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
