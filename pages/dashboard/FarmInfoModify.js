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
import Asterisk from "../../components/Asterisk";

import UploadPreview from "../../components/UploadPreview";
import fetch from "isomorphic-unfetch";
import router from "next/router";

const FarmInfoModify = () => {
  const [isSave, setIsSave] = useState(false);
  const [filesSrc, setFilesSrc] = useState([]);

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
    for (let eachFile of filesSrc) {
      let data = await uploadImage(eachFile);
      urls.push(data);
    }

    let respond = await fetch("http://localhost:3000/api/farm/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
      },
      body: JSON.stringify({ ...values, farmImage: urls }),
    });
    let data = await respond.json();

    if (data.status === 500) console.log(data.status);

    setIsSave(false);

    router.push("/dashboard");
  };

  return (
    <Box as="form" px={16} py={12} onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="space-between" align="center">
        <Heading>Thông tin của bạn</Heading>
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
          <UploadPreview filesSrc={filesSrc} setFilesSrc={setFilesSrc} />
        </FormControl>
      </Grid>
    </Box>
  );
};

export default FarmInfoModify;
