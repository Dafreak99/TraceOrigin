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
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { mutate } from "swr";
import Link from "next/link";
import { FaStickyNote } from "react-icons/fa";

export const AddFoodModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
    //   try {
    //     let res = await fetch("/api/pond", {
    //       method: "POST",
    //       body: values,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization:
    //           "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    //       },
    //       body: JSON.stringify(values),
    //     });
    //     let data = await res.json();
    //     mutate(
    //       [
    //         "/api/pond",
    //         "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    //       ],
    //       async (cachedData) => {
    //         return [...cachedData, data];
    //       },
    //       false
    //     );
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    //   onClose();
  };

  return (
    <>
      <Box className="sidebar__link--sub" onClick={onOpen} cursor="pointer">
        <ListIcon icon={FaStickyNote} color="gray.50" />
        Nhập thức ăn
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Nhập thông tin thức ăn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="foodDate">Ngày tháng năm: </FormLabel>
              <Input
                type="text"
                id="foodDate"
                name="foodDate"
                defaultValue={format(new Date(), "dd/MM/yyyy")}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="foodName">
                Tên người/cửa hàng đại lý thức ăn:{" "}
              </FormLabel>
              <Input
                type="text"
                id="foodName"
                name="foodName"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="foodQuantity">Số lượng(kg): </FormLabel>
              <Input
                type="text"
                id="foodQuantity"
                name="foodQuantity"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="produceDate">Ngày sản xuất</FormLabel>
              <Input
                type="text"
                id="produceDate"
                name="produceDate"
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

export default AddFoodModal;
