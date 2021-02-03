import {
  Box,
  Grid,
  Heading,
  FormLabel,
  Input,
  Flex,
  Button,
  Spinner,
  Textarea,
} from "@chakra-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";

import Asterisk from "./Asterisk";
import UploadPreview from "./UploadPreview";
import router from "next/router";
import Map from "../Map";
import FormControl from "./FormControl";
import BackButton from "./BackButton";

const FarmInfoModify = ({ isEdit, setIsEdit, data }) => {
  const [farmInfo, setData] = useState(data);
  const [isSave, setIsSave] = useState(false);
  const [entry, setEntry] = useState(null);

  let a = [],
    b = [];

  if (farmInfo.hinhAnh) {
    a = Array(farmInfo.hinhAnh.length).fill("");
    b = farmInfo.hinhAnh;
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
          process.browser ? localStorage.getItem("token") : null,

        // process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ ...values, hinhAnh: urls }),
    });
    let data = await respond.json();

    if (data.status === 500) console.log(data.message);

    setIsSave(false);

    router.reload();
  };

  return (
    <Box as="form" px={16} py={12} onSubmit={handleSubmit(onSubmit)}>
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
        rowGap="2rem"
        background="#fff"
        px={12}
        py={8}
        mt="2rem"
        boxShadow="0 4px 10px rgba(0,0,0,.1)"
      >
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="tenCoSoNuoi">
            Tên cơ sở nuôi
            <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="tenCoSoNuoi"
            name="tenCoSoNuoi"
            defaultValue={farmInfo.tenCoSoNuoi}
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="tenChuCoSoNuoi">
            Họ tên chủ cơ sở nuôi <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="tenChuCoSoNuoi"
            name="tenChuCoSoNuoi"
            defaultValue={farmInfo.tenChuCoSoNuoi}
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="diaChi">
            Địa chỉ <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="diaChi"
            name="diaChi"
            defaultValue={farmInfo.diaChi}
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="dienTich">
            Tổng diện tích cơ sở nuôi <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="dienTich"
            name="dienTich"
            defaultValue={farmInfo.dienTich}
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="sdt">
            SĐT liên lạc <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="sdt"
            name="sdt"
            defaultValue={farmInfo.sdt}
            ref={register({
              required: "Required",
            })}
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
            ref={register({
              required: "Required",
            })}
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
            ref={register({
              required: "Required",
            })}
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
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="toaDo">
            Tọa độ <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="toaDo"
            name="toaDo"
            defaultValue={farmInfo.toaDo}
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="banDo">
            Bản đồ <Asterisk />
          </FormLabel>
          <Input
            type="text"
            id="banDo"
            name="banDo"
            defaultValue={farmInfo.banDo}
            ref={register({
              required: "Required",
            })}
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
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <FormControl gridColumn="span 6">
          <FormLabel htmlFor="mst">
            Mô tả <Asterisk />
          </FormLabel>

          <Textarea
            type="text"
            name="moTa"
            id="moTa"
            ref={register({
              required: "Required",
            })}
          >
            {farmInfo.moTa}
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
            <Map entry={entry} setEntry={setEntry} />
          </Box>
        </FormControl>
      </Grid>
    </Box>
  );
};

export default FarmInfoModify;
