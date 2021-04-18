import {
  FormLabel,
  Button,
  Spinner,
  AlertDescription,
  AlertTitle,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
} from "@chakra-ui/react";

import { useState } from "react";

import { useForm } from "react-hook-form";
import UploadPreview from "@/components/dashboard/UploadPreview";
import { Divider, Button as AntdButton } from "antd";
import { useRouter } from "next/router";

import FormControl from "./FormControl";
import { mutate } from "swr";

const EnterpriseAuthenticationModal = ({ isOpen, onClose, onOpen }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

    try {
      await fetch("/api/enterpriseauthentication", {
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
    onClose();

    router.push("/farm");
    reset();
    setIsSave(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thêm xác thực pháp lý cho doanh nghiệp</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              marginBottom="2rem"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Lưu ý
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Để tăng độ xác thực của doanh nghiệp cũng như đảm bảo lòng tin
                của người tiêu dùng. Vui lòng tải lên tất cả các hình ảnh về
                giấy tờ có liên quan như các loại giấy chứng nhận đăng ký kinh
                doanh, an toàn vệ sinh thực phẩm...
              </AlertDescription>
            </Alert>
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

export default EnterpriseAuthenticationModal;
