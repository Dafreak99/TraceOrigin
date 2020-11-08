import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Select,
  ListIcon,
  Spinner,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { FaStickyNote } from "react-icons/fa";
import { useRouter } from "next/router";

import DatePicker from "../DatePicker";
import UploadPreview from "./UploadPreview";
import { GiMedicines } from "react-icons/gi";
import { AiFillMedicineBox } from "react-icons/ai";
import { mutate } from "swr";

export const AddMedicineModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  let currentDate = format(new Date(), "dd/MM/yyyy");
  const [ngayNhap, setNgayNhap] = useState(currentDate);
  const [ngaySanXuat, setNgaySanXuat] = useState(currentDate);
  const [hanSuDung, setHanSuDung] = useState(currentDate);

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const router = useRouter();

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
      <Box className="sidebar__link--sub" onClick={onOpen} cursor="pointer">
        <ListIcon icon={AiFillMedicineBox} color="gray.50" />
        Nhập thuốc
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          maxW="56.25rem"
        >
          <ModalHeader>Nhập thông tin thuốc</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridColumnGap="4rem"
            gridRowGap="1rem"
          >
            <FormControl>
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
            <FormControl>
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
            <FormControl>
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
            <FormControl>
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
            <FormControl>
              <FormLabel htmlFor="ngayNhap">Ngày nhập thuốc: </FormLabel>
              <DatePicker
                selectedDate={ngayNhap}
                setSelectedDate={setNgayNhap}
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
            <FormControl>
              <FormLabel>Hình ảnh thuốc</FormLabel>
              <UploadPreview
                files={files}
                setFiles={setFiles}
                fileUrls={fileUrls}
                setFileUrls={setFileUrls}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMedicineModal;