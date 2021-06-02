import {
  Box,
  Select,
  Button,
  FormLabel,
  Input,
  Spinner,
  Alert,
  AlertIcon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import FormControl from "./FormControl";
import { useState } from "react";
import useSWR, { mutate } from "swr";

import DatePicker from "../DatePicker";
import { AiFillEdit } from "react-icons/ai";
import fetcher from "@/utils/fetcher";

export const EditSeedModal = ({ pondId, seed }) => {
  const { name, quantity, seedAge, stockingDate, _id } = seed;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, control, reset } = useForm();
  const [isSave, setIsSave] = useState(false);

  const { data, error } = useSWR(
    ["/api/hatchery", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const onSubmit = async (values) => {
    if (!values.hatchery) return;

    setIsSave(true);

    try {
      await fetch(`/api/seed/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });

      mutate(
        [
          `/api/pond/${pondId}/product`,
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          return {
            ...cachedData,
            seed: {
              ...cachedData.seed,
              ...values,
            },
          };
        },
        false
      );
    } catch (error) {
      console.log(error.message);
      message.error("Lỗi !");
    }

    setIsSave(false);
    onClose();
  };

  return (
    <>
      <Box as={AiFillEdit} size="32px" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Chỉnh sửa con giống</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Tên con giống: </FormLabel>
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
              <FormLabel htmlFor="quantity">Số lượng: </FormLabel>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                defaultValue={quantity}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="stockingDate">Ngày sản xuất</FormLabel>
              <DatePicker
                control={control}
                name="stockingDate"
                placeholder={stockingDate}
              />
              {errors.stockingDate?.type === "required" && (
                <Text fontSize="md" fontStyle="italic" color="red.300">
                  Vui lòng nhập ngày
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="seedAge">Ngày tuổi của con giống:</FormLabel>
              <Input
                type="number"
                id="seedAge"
                name="seedAge"
                defaultValue={seedAge}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="hatchery">Trại giống:</FormLabel>
              {data?.defaultHatcheries?.length > 0 ? (
                <Select
                  id="hatchery"
                  name="hatchery"
                  ref={register({
                    required: "Required",
                  })}
                >
                  {data.defaultHatcheries.map((each) => (
                    <option value={each._id}>{each.name}</option>
                  ))}
                </Select>
              ) : (
                <Alert status="warning">
                  <AlertIcon />
                  <Text fontSize="md">Vui lòng thêm thông tin trại giống</Text>
                </Alert>
              )}
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

export default EditSeedModal;
