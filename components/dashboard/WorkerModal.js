import {
  FormLabel,
  Input,
  Button,
  Spinner,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { Button as AntdButton } from "antd";
import { HiPlus } from "react-icons/hi";
import FormControl from "./FormControl";
import { mutate } from "swr";
import DatePicker from "../DatePicker";

const WorkerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSave, setIsSave] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (values) => {
    setIsSave(true);

    try {
      let res = await fetch("/api/worker", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });

      let data = await res.json();

      mutate(
        ["/api/worker", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          return [...cachedData, data];
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    onClose();

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
          <ModalHeader>Nhật ký cho ăn</ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridColumnGap="2rem"
          >
            <FormControl>
              <FormLabel htmlFor="name">Họ và tên</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                {...register("name", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">Địa chỉ</FormLabel>
              <Input
                type="text"
                id="address"
                name="address"
                {...register("address", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">SĐT</FormLabel>
              <Input
                type="text"
                id="phone"
                name="phone"
                {...register("phone", { required: true })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="idCard">CMND</FormLabel>
              <Input
                type="text"
                id="idCard"
                name="idCard"
                {...register("idCard", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dateOfBorn">Năm sinh</FormLabel>
              <DatePicker control={control} name="dateOfBorn" />
              {errors.dateOfBorn?.type === "required" && (
                <Text fontSize="md" fontStyle="italic" color="red.300">
                  Vui lòng nhập ngày
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="gender">Giới tính</FormLabel>
              <Select name="gender" ref={register()}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="degree">Bằng cấp</FormLabel>
              <Select name="degree" ref={register()}>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Cử nhân">Cử nhân</option>
                <option value="Cấp 3">Cấp 3</option>
                <option value="Cấp 2">Cấp 2</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="responsibility">Nhiệm vụ</FormLabel>
              <Input
                type="text"
                id="responsibility"
                name="responsibility"
                {...register("responsibility", { required: true })}
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

export default WorkerModal;
