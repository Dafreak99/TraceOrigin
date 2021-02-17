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
  FormLabel,
  Input,
  useDisclosure,
  Select,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { mutate } from "swr";

import FormControl from "./FormControl";

export const AddPondModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values) => {
    try {
      let res = await fetch("/api/pond", {
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

    onClose();
  };

  return (
    <>
      <Button mb={8} backgroundColor="gray.300" onClick={onOpen}>
        Thêm ao mới
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thêm ao mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Tên ao: </FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="area">Diện tích ao: </FormLabel>
              <Input
                type="text"
                id="area"
                name="area"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="code">Mã số ao: </FormLabel>
              <Input
                type="text"
                id="code"
                name="code"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="stockingDensity">
                Mật độ thả(Ước lượng số con thả/m3):
              </FormLabel>
              <Input
                type="text"
                id="stockingDensity"
                name="stockingDensity"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPondModal;
