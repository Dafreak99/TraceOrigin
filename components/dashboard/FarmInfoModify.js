import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Map from "../Map";
import Asterisk from "./Asterisk";
import BackButton from "./BackButton";
import FormControl from "./FormControl";
import UploadPreview from "./UploadPreview";

const FarmInfoModify = ({ isEdit, setIsEdit, data = {} }) => {
  const [farmInfo, setData] = useState(data);
  const [isSave, setIsSave] = useState(false);

  let a = [],
    b = [];

  if (farmInfo?.images) {
    a = Array(farmInfo.images.length).fill("");
    b = farmInfo.images;
  }

  const [files, setFiles] = useState(a);
  const [fileUrls, setFileUrls] = useState(b);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

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

    let respond = await fetch("/api/farm/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ ...values, images: urls }),
    });
    let data = await respond.json();

    setIsSave(false);

    router.reload();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="space-between" align="center">
        <Flex alignItems="center">
          <BackButton onClick={() => setIsEdit(!isEdit)} />
          <Heading>Thông tin của bạn</Heading>
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
        gridTemplateColumns="repeat(12, 1fr)"
        columnGap={{ base: "1rem", md: "3rem" }}
        background="#fff"
        px={12}
        py={8}
        margin="2rem auto"
        boxShadow="0 4px 10px rgba(0,0,0,.1)"
        w="50vw"
      >
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="name">
            Tên cơ sở nuôi
            <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={farmInfo.name}
            {...register("name", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="owner">
            Họ tên chủ cơ sở nuôi <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="owner"
            name="owner"
            defaultValue={farmInfo.owner}
            {...register("owner", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="address">
            Địa chỉ <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="address"
            name="address"
            defaultValue={farmInfo.address}
            {...register("name", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="area">
            Tổng diện tích cơ sở nuôi <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="area"
            name="area"
            defaultValue={farmInfo.area}
            {...register("area", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="phone">
            SĐT liên lạc <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="phone"
            name="phone"
            defaultValue={farmInfo.phone}
            {...register("phone", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="fax">
            Fax <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="fax"
            name="fax"
            defaultValue={farmInfo.fax}
            {...register("fax", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="website">
            Website <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="website"
            name="website"
            defaultValue={farmInfo.website}
            {...register("website", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="email">
            Email <Asterisk />
          </FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            defaultValue={farmInfo.email}
            {...register("email", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="mst">
            Mã số thuế <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="mst"
            name="MST"
            defaultValue={farmInfo.MST}
            {...register("MST", { required: true })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="mst">
            Mô tả <Asterisk />
          </FormLabel>

          <Textarea
            type="text"
            name="description"
            id="description"
            {...register("description", { required: true })}
          >
            {farmInfo.description}
          </Textarea>
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel>
            Hình ảnh của cơ sở <Asterisk />
          </FormLabel>
          <br />
          <UploadPreview
            files={files}
            setFiles={setFiles}
            fileUrls={fileUrls}
            setFileUrls={setFileUrls}
          />
        </FormControl>

        <FormControl gridColumn="span 6">
          <FormLabel>
            Vị trí của cơ sở <Asterisk />
          </FormLabel>
          <Box height="300px">
            <Controller
              name="coordinate"
              control={control}
              defaultValue={false}
              rules={{ required: true }}
              render={({ onChange }) => (
                <Map onChange={onChange} defaultCoordinate={data.coordinate} />
              )}
            />
          </Box>
        </FormControl>
      </Grid>
    </Box>
  );
};

export default FarmInfoModify;
