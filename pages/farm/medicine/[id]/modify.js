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
} from "@chakra-ui/react";
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
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const currentDate = format(new Date(), "dd/MM/yyyy");

  const [importDate, setNgayNhap] = useState(currentDate);
  const [manufactureDate, setNgaySanXuat] = useState(currentDate);
  const [expiryDate, setHanSuDung] = useState(currentDate);

  const [generalData, setGeneralData] = useState(null);

  const [preservationMethod, setCachBaoQuan] = useState(null);

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
      setNgayNhap(data.importDate);
      setNgaySanXuat(data.manufactureDate);
      setHanSuDung(data.expiryDate);
      setCachBaoQuan(data.preservationMethod);
      if (data.images) {
        setFiles(Array(data.images.length).fill(""));
        setFileUrls(data.images);
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

    values.images = urls;

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
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
                <FormLabel htmlFor="importDate">Ngày nhập: </FormLabel>
                <br />
                <DatePicker
                  control={control}
                  name="importDate"
                  placeholder={importDate}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Tên thuốc</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={onChange}
                  value={generalData.name}
                  {...register("name", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="medicineSupplier">
                  Tên người/cửa hàng cung cấp thuốc:{" "}
                </FormLabel>
                <Input
                  type="text"
                  id="medicineSupplier"
                  name="medicineSupplier"
                  onChange={onChange}
                  value={generalData.medicineSupplier}
                  {...register("medicineSupplier", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="medicineSupplierAddress">
                  Địa chỉ đơn vị cung cấp thuốc:{" "}
                </FormLabel>
                <Input
                  type="text"
                  id="medicineSupplierAddress"
                  name="medicineSupplierAddress"
                  onChange={onChange}
                  value={generalData.medicineSupplierAddress}
                  {...register("medicineSupplierAddress", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="weight">Số lượng(kg): </FormLabel>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  onChange={onChange}
                  value={generalData.weight}
                  {...register("weight", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="manufactureDate">Ngày sản xuất</FormLabel>
                <br />
                <DatePicker
                  control={control}
                  name="manufactureDate"
                  placeholder={manufactureDate}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="expiryDate">Hạn sử dụng</FormLabel>
                <br />
                <DatePicker
                  control={control}
                  name="expiryDate"
                  placeholder={expiryDate}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="preservationMethod">
                  Cách bảo quản
                </FormLabel>

                <Controller
                  name="preservationMethod"
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
