import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
  Text,
  AlertDescription,
  AlertTitle,
  Alert,
  AlertIcon,
} from "@chakra-ui/core";

import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { useForm } from "react-hook-form";
import UploadPreview from "@/components/dashboard/UploadPreview";
import { Divider, Button as AntdButton } from "antd";
import { useRouter } from "next/router";

import FormControl from "./FormControl";
import { mutate } from "swr";

const EnterpriseAuthenticationModal = ({ visible, setVisible }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

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
    setVisible(false);

    router.push("/farm");
    reset();
    setIsSave(false);
  };
  return (
    <>
      <Modal
        visible={visible}
        title="Thêm xác thực pháp lý cho doanh nghiệp"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}

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
            Để tăng độ xác thực của doanh nghiệp cũng như đảm bảo lòng tin của
            người tiêu dùng. Vui lòng tải lên tất cả các hình ảnh về giấy tờ có
            liên quan như các loại giấy chứng nhận đăng ký kinh doanh, an toàn
            vệ sinh thực phẩm...
          </AlertDescription>
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Hình ảnh</FormLabel>
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

export default EnterpriseAuthenticationModal;
