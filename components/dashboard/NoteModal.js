import {
  Text,
  Flex,
  Button,
  FormLabel,
  Input,
  Spinner,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "../DatePicker";

import FormControl from "./FormControl";
import UploadPreview from "./UploadPreview";

const NoteModal = ({ bg, color, icon, pondId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const [isSave, setIsSave] = useState(false);

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const handleCancel = () => setVisible(false);

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
    values.pond = pondId;

    try {
      await fetch("/api/note", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      message.success("Đã ghi nhận");
    } catch (error) {
      message.success("Lỗi: " + error.message);

      console.log(error.message);
    }

    setFiles([]);
    setFileUrls([]);

    reset();
    setIsSave(false);
    onClose();
  };

  return (
    <>
      <Box
        className="diary-boxx"
        onClick={onOpen}
        gridColumn={{ base: "span 12", md: "span 6", xl: "span 3" }}
      >
        <Flex
          height="60px"
          width="60px"
          borderRadius="15px"
          justify="center"
          align="center"
          backgroundColor={bg}
          margin="0 auto"
        >
          <Box as={icon} height="32px" width="32px" color={color} />
        </Flex>
        <Text fontWeight="bold" fontSize="xl" mt="2rem">
          Nhật ký ao
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Nhật ký ao</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="note">Ghi chú: </FormLabel>
              <Input
                type="text"
                id="note"
                name="note"
                {...register("note", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date">Ngày ghi: </FormLabel>
              <DatePicker control={control} name="createdDate" />
            </FormControl>

            <FormControl>
              <FormLabel>Hình ảnh</FormLabel>
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

export default NoteModal;
