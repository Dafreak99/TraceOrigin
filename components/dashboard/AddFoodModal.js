import {
  FormControl,
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
import UploadPreview from "@/components/dashboard/UploadPreview";
import { Divider, Button as AntdButton } from "antd";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";

const AddFood = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  let currentDate = format(new Date(), "dd/MM/yyyy");

  const [ngayNhap, setNgayNhap] = useState(currentDate);
  const [ngaySanXuat, setNgaySanXuat] = useState(currentDate);
  const [hanSuDung, setHanSuDung] = useState(currentDate);

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    setIsSave(true);
    values.ngayNhap = ngayNhap;
    values.ngaySanXuat = ngaySanXuat;
    values.hanSuDung = hanSuDung;

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
      let res = await fetch("/api/food", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
    }

    setFiles([]);
    setFileUrls([]);
    setVisible(false);

    router.push("/dashboard/food");

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
        }}
      >
        <HiPlus fontSize="28px" />
      </AntdButton>

      <Modal
        visible={visible}
        title="Nhập thức ăn"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="ngayNhap">Ngày tháng năm: </FormLabel>
            <DatePicker selectedDate={ngayNhap} setSelectedDate={setNgayNhap} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="tenThucAn">Tên thức ăn</FormLabel>
            <Input
              type="text"
              id="tenThucAn"
              name="tenThucAn"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="donViCungCapThucAn">
              Tên người/cửa hàng đại lý thức ăn:{" "}
            </FormLabel>
            <Input
              type="text"
              id="donViCungCapThucAn"
              name="donViCungCapThucAn"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="soLuong">Số lượng(kg): </FormLabel>
            <Input
              type="text"
              id="soLuong"
              name="soLuong"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="ngaySanXuat">Ngày sản xuất</FormLabel>
            <DatePicker
              selectedDate={ngaySanXuat}
              setSelectedDate={setNgaySanXuat}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="hanSuDung">Hạn sử dụng</FormLabel>
            <DatePicker
              selectedDate={hanSuDung}
              setSelectedDate={setHanSuDung}
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

export default AddFood;
