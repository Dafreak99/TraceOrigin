import {
  Flex,
  FormLabel,
  Text,
  Button,
  Input,
  Spinner,
  Alert,
  AlertIcon,
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
import { Select } from "antd";

import { useState } from "react";
import { useForm } from "react-hook-form";

import FormControl from "./FormControl";

import DatePicker from "../DatePicker";

const ReplaceWaterModal = ({ bg, color, icon, name, pondId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [isSave, setIsSave] = useState(false);

  const onSubmit = async (values) => {
    setIsSave(true);

    values.pondId = pondId;

    try {
      await fetch("/api/replacewater", {
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

    setIsSave(false);
    onClose();
    reset();
  };

  return (
    <>
      <Box
        className="diary-boxx"
        onClick={onOpen}
        gridColumn={{ base: "span 12", md: "span 6", xl: "span 3" }}
      >
        <Flex
          height="60px"
          width="60px"
          borderRadius="15px"
          justify="center"
          align="center"
          backgroundColor={bg}
          margin="0 auto"
        >
          <Box as={icon} height="32px" width="32px" color={color} />
        </Flex>
        <Text fontWeight="bold" fontSize="xl" mt="2rem">
          {name}
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <FormControl>
                <FormLabel htmlFor="sanPham">
                  Phần trăm lượng nước được thay:
                </FormLabel>
                <Input
                  type="number"
                  {...register("percentage", { required: true, min: 0 })}
                />
                {errors.percentage?.type === "min" && (
                  <Text fontSize="md" fontStyle="italic" color="red.300">
                    Không thể nhỏ hơn 0%
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="createdDate">Ngày tháng năm:</FormLabel>
                <DatePicker control={control} name="createdDate" />

                {errors.createdDate?.type === "required" && (
                  <Text fontSize="md" fontStyle="italic" color="red.300">
                    Vui lòng nhập ngày
                  </Text>
                )}
              </FormControl>
            </>
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

export default ReplaceWaterModal;
