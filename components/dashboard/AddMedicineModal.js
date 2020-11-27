import { useState } from "react";
import {
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Select,
  Spinner,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Modal from "antd/lib/modal/Modal";
import { mutate } from "swr";
import { Button as AntdButton } from "antd";
import { HiPlus } from "react-icons/hi";

import DatePicker from "../DatePicker";
import UploadPreview from "./UploadPreview";

export const AddMedicineModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSave, setIsSave] = useState(false);
  const [visible, setVisible] = useState(false);

  const { handleSubmit, register, errors } = useForm();

  let currentDate = format(new Date(), "dd/MM/yyyy");
  const [ngayNhap, setNgayNhap] = useState(currentDate);
  const [ngaySanXuat, setNgaySanXuat] = useState(currentDate);
  const [hanSuDung, setHanSuDung] = useState(currentDate);

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const router = useRouter();

  const showModal = () => setVisible(true);

  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

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
      let res = await fetch("/api/medicine", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            // REPLACE TOKEN
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });
      let data = await res.json();

      mutate(
        [
          "/api/medicine",
          // REPLACE TOKEN
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        ],
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
        title="Nhập thuốc"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{ minWidth: "65rem" }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            columnGap: "2rem",
          }}
        >
          <FormControl gridColumn="span 6">
            <FormLabel htmlFor="tenThuoc">Tên thuốc</FormLabel>
            <Input
              type="text"
              id="tenThuoc"
              name="tenThuoc"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl gridColumn="span 6">
            <FormLabel htmlFor="donViCungCapThuoc">
              Tên người/cửa hàng đại lý bán:{" "}
            </FormLabel>
            <Input
              type="text"
              id="donViCungCapThuoc"
              name="donViCungCapThuoc"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl gridColumn="span 6">
            <FormLabel htmlFor="diaChiDonViCungCapThuoc">
              Địa chỉ đơn vị bán:{" "}
            </FormLabel>
            <Input
              type="text"
              id="diaChiDonViCungCapThuoc"
              name="diaChiDonViCungCapThuoc"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl gridColumn="span 6">
            <FormLabel htmlFor="soLuong">Số lượng(kg):{""}</FormLabel>
            <Input
              type="number"
              id="soLuong"
              name="soLuong"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl gridColumn="span 6">
            <FormLabel htmlFor="ngayNhap">Ngày nhập thuốc: </FormLabel>
            <DatePicker selectedDate={ngayNhap} setSelectedDate={setNgayNhap} />
          </FormControl>
          <FormControl gridColumn="span 6">
            <FormLabel htmlFor="ngaySanXuat">Ngày sản xuất</FormLabel>
            <DatePicker
              selectedDate={ngaySanXuat}
              setSelectedDate={setNgaySanXuat}
            />
          </FormControl>
          <FormControl gridColumn="span 6">
            <FormLabel htmlFor="hanSuDung">Hạn sử dụng</FormLabel>
            <DatePicker
              selectedDate={hanSuDung}
              setSelectedDate={setHanSuDung}
            />
          </FormControl>
          <FormControl gridColumn="span 6">
            <FormLabel htmlFor="soLuong">Cách bảo quản:</FormLabel>
            <Select
              name="cachBaoQuan"
              ref={register({
                required: "Required",
              })}
            >
              <option value="Tủ lạnh">Tủ lạnh</option>
              <option value="Trong kho">Trong kho</option>
            </Select>
          </FormControl>
          <FormControl gridColumn="span 6">
            <FormLabel>Hình ảnh thuốc</FormLabel>
            <UploadPreview
              files={files}
              setFiles={setFiles}
              fileUrls={fileUrls}
              setFileUrls={setFileUrls}
            />
          </FormControl>
          <ModalFooter gridColumn="span 12">
            <Button variantColor="blue" mr={3} onClick={handleCancel}>
              Close
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

export default AddMedicineModal;
