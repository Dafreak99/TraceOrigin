import {
  Button,
  FormLabel,
  Input,
  Spinner,
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
import { AiOutlinePlus } from "react-icons/ai";

import { mutate } from "swr";

import FormControl from "./FormControl";

export const AddPondModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register, reset } = useForm();

  const [isSave, setIsSave] = useState(false);

  const onSubmit = async (values) => {
    setIsSave(true);
    try {
      let res = await fetch("/api/pond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });

      let data = await res.json();

      mutate(
        ["/api/pond", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          let ponds = [...cachedData.ponds, data];

          return { ponds, isAuthenticated: cachedData.isAuthenticated };
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setIsSave(false);
    reset();
    onClose();
  };

  return (
    <>
      <Button
        backgroundColor="gray.300"
        leftIcon={<AiOutlinePlus />}
        onClick={onOpen}
      >
        Thêm ao mới
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thêm ao</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Tên ao: </FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                {...register("name", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="area">Diện tích ao (m2): </FormLabel>
              <Input
                type="number"
                id="area"
                name="area"
                {...register("area", { required: true })}
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

export default AddPondModal;
