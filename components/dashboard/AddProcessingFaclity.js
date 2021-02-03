import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
} from "@chakra-ui/core";

import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Divider, Button as AntdButton } from "antd";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";

import FormControl from "./FormControl";

import { mutate } from "swr";
import UploadPreview from "./UploadPreview";

const AddProcessingFacility = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
  };

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

    try {
      let res = await fetch("/api/processingfacility", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      mutate(
        [
          "/api/processingfacility",
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => [...cachedData, data],
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setVisible(false);

    reset();
    setIsSave(false);
  };
  return (
    <>
      <AntdButton
        type="primary"
        shape="circle"
        onClick={showModal}
        style={{
          position: "fixed",
          bottom: "4rem",
          right: "5%",
          height: "3rem",
          width: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(90deg, rgba(35,144,246,1) 0%, rgba(11,90,191,1) 100%)",
          boxShadow: "0 15px 30px rgb(23 65 187 / 34%)",
        }}
      >
        <HiPlus fontSize="28px" />
      </AntdButton>

      <Modal
        visible={visible}
        title="Thêm cơ sở chế biến"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="tenTraiGiong">Tên cơ sở chế biến</FormLabel>
            <Input
              type="text"
              id="tenCoSoCheBien"
              name="tenCoSoCheBien"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="diaChiCoSoCheBien">
              Địa chỉ cơ sở chế biến
            </FormLabel>
            <Input
              type="text"
              id="diaChiCoSoCheBien"
              name="diaChiCoSoCheBien"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="diaChiCoSoCheBien">Tọa độ</FormLabel>
            <Input
              type="text"
              id="toaDo"
              name="toaDo"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="diaChiCoSoCheBien">Bản đồ</FormLabel>
            <Input
              type="text"
              id="banDo"
              name="banDo"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="diaChiCoSoCheBien">
              Hình ảnh cơ sở chế biến
            </FormLabel>
            <UploadPreview
              files={files}
              setFiles={setFiles}
              fileUrls={fileUrls}
              setFileUrls={setFileUrls}
            />
          </FormControl>

          <Divider />

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={handleCancel}>
              Đóng
            </Button>
            {isSave ? (
              <Button backgroundColor="gray.400" color="#fff">
                <Spinner mr={4} /> Đang lưu
              </Button>
            ) : (
              <Button variant="ghost" type="submit">
                Lưu
              </Button>
            )}
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default AddProcessingFacility;
