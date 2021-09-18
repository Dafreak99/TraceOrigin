import UploadPreview from "@/components/dashboard/UploadPreview";
import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Button as AntdButton } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { mutate } from "swr";
import DatePicker from "../DatePicker";
import FormControl from "./FormControl";

const AddFood = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

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

    values.images = urls;
    values.weight = +values.weight;

    try {
      let res = await fetch("/api/food", {
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
        ["/api/food", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          return [...cachedData, data];
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setFiles([]);
    setFileUrls([]);
    onClose();

    router.push("/farm/food");
    reset();
    setIsSave(false);
  };
  return (
    <>
      <AntdButton
        type="primary"
        shape="circle"
        onClick={onOpen}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Nhập thức ăn</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="grid"
            gridTemplateColumns="repeat(2,1fr)"
            gridColumnGap="2rem"
          >
            <FormControl gridColumn="span 2">
              <FormLabel htmlFor="name"> Tên thức ăn</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl gridColumn="span 2">
              <FormLabel htmlFor="foodSupplier">
                Tên người/cửa hàng đại lý thức ăn:{" "}
              </FormLabel>
              <Input
                type="text"
                id="foodSupplier"
                name="foodSupplier"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl gridColumn="span 1">
              <FormLabel htmlFor="weight">Số lượng(kg): </FormLabel>
              <Input
                type="number"
                id="weight"
                name="weight"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl gridColumn="span 1">
              <FormLabel htmlFor="importDate">Ngày nhập: </FormLabel>
              <DatePicker control={control} name="importDate" />
            </FormControl>
            <FormControl gridColumn="span 1">
              <FormLabel htmlFor="manufactureDate">Ngày sản xuất</FormLabel>
              <DatePicker control={control} name="manufactureDate" />
            </FormControl>
            <FormControl gridColumn="span 1">
              <FormLabel htmlFor="expiryDate">Hạn sử dụng</FormLabel>
              <DatePicker control={control} name="expiryDate" />
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFood;
