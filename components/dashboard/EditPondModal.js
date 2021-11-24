import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { mutate } from "swr";
import FormControl from "./FormControl";

const EditPondModal = ({ data }) => {
  const { name, area, _id } = data;

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (values) => {
    setIsSave(true);

    values._id = _id;

    let data = await (
      await fetch(`/api/pond/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      })
    ).json();

    mutate(
      ["/api/pond", process.browser ? localStorage.getItem("token") : null],
      async () => data,
      false
    );

    onClose();

    setIsSave(false);
  };
  return (
    <>
      <Box as={AiFillEdit} size="32px" onClick={onOpen} cursor="pointer" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Chỉnh sửa ao</ModalHeader>
          <ModalCloseButton />

          <ModalBody
            // display="grid"
            // gridTemplateColumns="repeat(2, 1fr)"
            // gridGap="2rem"
            size="3xl"
          >
            <FormControl>
              <FormLabel htmlFor="name">Tên ao</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                defaultValue={name}
                {...register("name", { required: true })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="area">Diện tích</FormLabel>
              <Input
                type="number"
                id="area"
                name="area"
                defaultValue={area}
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

export default EditPondModal;
