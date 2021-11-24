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
  Select,
} from "@chakra-ui/react";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import FormControl from "./FormControl";
import { AiOutlinePlus } from "react-icons/ai";

const AddPackingMethod = ({ productId }) => {
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

    values.productId = productId;

    try {
      let res = await fetch("/api/packingmethod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
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
      <Button onClick={onOpen}>
        <Box as={AiOutlinePlus} mr="5px" />
        Đóng gói
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thêm cách đóng gói</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="packingMethod">Cách đóng gói</FormLabel>
              <Controller
                name="packingMethod"
                control={control}
                defaultValue="Túi PE"
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    size="large"
                    onChange={onChange}
                    style={{ width: "100%" }}
                    defaultValue="Túi PE"
                  >
                    <option value="Túi PE">Túi PE</option>
                    <option value="Thùng xốp">Thùng xốp</option>
                    <option value="Hộp nhựa">Hộp nhựa</option>
                  </Select>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Mô tả</FormLabel>
              <Input
                type="text"
                id="description"
                name="description"
                {...register("description", { required: true })}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>

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
      </Modal>
    </>
  );
};

export default AddPackingMethod;
