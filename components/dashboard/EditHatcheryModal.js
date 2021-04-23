import {
  FormLabel,
  Input,
  Button,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import FormControl from "./FormControl";

import { mutate } from "swr";
import { FaEdit } from "react-icons/fa";
import Map from "../Map";

const EditHatcheryModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { name, address, coordinate, _id } = data;

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const onSubmit = async (values) => {
    setIsSave(true);

    values._id = _id;

    await fetch(`/api/hatchery`, {
      method: "PUT",
      body: values,
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify(values),
    });

    mutate(
      ["/api/hatchery", process.browser ? localStorage.getItem("token") : null],
      async (cachedData) => {
        let index = cachedData.findIndex((each) => each._id === _id);

        return [
          ...cachedData.slice(0, index),
          values,
          ...cachedData.slice(index + 1),
        ];
      },
      false
    );

    onClose();

    setIsSave(false);
  };

  return (
    <>
      <Box as={FaEdit} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Chỉnh sửa nhân công</ModalHeader>
          <ModalCloseButton />

          <ModalBody size="3xl">
            <FormControl>
              <FormLabel htmlFor="name">Tên trại giống</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                defaultValue={name}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">Địa chỉ</FormLabel>
              <Input
                type="text"
                id="address"
                name="address"
                defaultValue={address}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="coordinate">Vị trí</FormLabel>

              <Box height="20rem">
                <Controller
                  name="coordinate"
                  control={control}
                  defaultValue={coordinate}
                  rules={{ required: true }}
                  render={({ onChange }) => (
                    <Map defaultCoordinate={coordinate} onChange={onChange} />
                  )}
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

export default EditHatcheryModal;
