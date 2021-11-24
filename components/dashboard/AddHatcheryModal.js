import {
  FormLabel,
  Input,
  Button,
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

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { Button as AntdButton } from "antd";
import { HiPlus } from "react-icons/hi";

import FormControl from "./FormControl";
import { mutate } from "swr";
import Map from "../Map";

const AddHatchery = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entry, setEntry] = useState(null);

  const [isSave, setIsSave] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    setIsSave(true);

    try {
      let res = await fetch("/api/hatchery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      mutate(
        [
          "/api/hatchery",
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          return {
            defaultHatcheries: cachedData.defaultHatcheries,
            requestedHatcheries: [...cachedData.requestedHatcheries, data],
          };
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    onClose();
    setEntry(null);
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
        }}
      >
        <HiPlus fontSize="28px" />
      </AntdButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thêm trại giống</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Tên trại giống</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                {...register("name", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">Địa chỉ trại giống: </FormLabel>
              <Input
                type="text"
                id="address"
                name="address"
                {...register("address", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="coordinate">Tọa độ: </FormLabel>
              <Box height="20rem">
                <Controller
                  name="coordinate"
                  control={control}
                  defaultValue={false}
                  rules={{ required: true }}
                  render={({ onChange }) => <Map onChange={onChange} />}
                />
              </Box>
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

export default AddHatchery;
