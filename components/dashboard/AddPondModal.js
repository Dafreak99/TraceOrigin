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
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { mutate } from "swr";

export const AddPondModal = () => {
  // ADD them phan nhan dien ao nao da va dang duoc nuoi trong giong nhu booking ve theater

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values) => {
    try {
      let res = await fetch("/api/pond", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });

      let data = await res.json();
      mutate(
        [
          "/api/pond",
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
              <FormLabel htmlFor="tenAo">Tên ao: </FormLabel>
              <Input
                type="text"
                id="tenAo"
                name="tenAo"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dienTich">Diện tích ao: </FormLabel>
              <Input
                type="text"
                id="dienTich"
                name="dienTich"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="maAo">Mã số ao: </FormLabel>
              <Input
                type="text"
                id="maAo"
                name="maAo"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="matDoTha">
                Mật độ thả(Ước lượng số con thả/m3):
              </FormLabel>
              <Input
                type="text"
                id="matDoTha"
                name="matDoTha"
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
