import {
  Box,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Spinner,
} from "@chakra-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";

import Asterisk from "./Asterisk";
import UploadPreview from "./UploadPreview";
import router from "next/router";

const FarmInfoModify = ({ isEdit, setIsEdit, data = {} }) => {
  const [farmInfo, setData] = useState(data);
  const [isSave, setIsSave] = useState(false);

  let a = [],
    b = [];

  if (farmInfo.farmImage) {
    a = Array(farmInfo.farmImage.length).fill("");
    b = farmInfo.farmImage;
  }

  const [files, setFiles] = useState(a);
  const [fileUrls, setFileUrls] = useState(b);

  const { handleSubmit, register, errors } = useForm();

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
        Authorization:
          // REPLACE WITH USER TOKEN
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
      },
      body: JSON.stringify({ ...values, farmImage: urls }),
    });
    let data = await respond.json();

    if (data.status === 500) console.log(data.message);

    setIsSave(false);

    router.reload();
  };

  return (
    <Box as="form" px={16} py={12} onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="space-between" align="center">
        <Heading display="flex" justifyContent="center" alignItems="center">
          {" "}
          {isEdit && (
            <Box as={BiArrowBack} mr={8} onClick={() => setIsEdit(!isEdit)} />
          )}{" "}
          Thông tin của bạn
        </Heading>
        {isSave ? (
          <Button backgroundColor="gray.400" color="#fff">
            <Spinner mr={4} /> Đang lưu
          </Button>
        ) : (
          <Button backgroundColor="gray.600" color="#fff" type="submit">
            Lưu thông tin
          </Button>
        )}
      </Flex>

      <Grid
        maxW="900px"
        gridTemplateColumns="repeat(12, 1fr)"
        columnGap={{ base: "1rem", md: "3rem" }}
      >
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="farmOwner">
            Tên cơ sở <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="farmName"
            name="farmName"
            defaultValue={farmInfo.farmName}
            onChange={() => console.log("hhh")}
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="farmOwner">
            Họ tên chủ cơ sở nuôi <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="farmOwner"
            name="farmOwner"
            defaultValue={farmInfo.farmOwner}
            ref={register({
              required: "Required",
            })}
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
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="address">
            Tổng diện tích cơ sở nuôi <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="acreage"
            name="acreage"
            defaultValue={farmInfo.acreage}
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="phoneNumber">
            SĐT liên lạc <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={farmInfo.phoneNumber}
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>

        <FormControl gridColumn="span 12">
          <FormLabel htmlFor="image">
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
      </Grid>
    </Box>
  );
};

export default FarmInfoModify;
