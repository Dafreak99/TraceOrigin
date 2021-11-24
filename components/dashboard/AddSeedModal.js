import fetcher from "@/utils/fetcher";
import {
  Alert,
  AlertIcon,
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
  Select,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import DatePicker from "../DatePicker";
import FormControl from "./FormControl";

export const AddSeedModal = ({ pondId }) => {
  const { data, error } = useSWR(
    ["/api/hatchery", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const [isSave, setIsSave] = useState(false);

  const onSubmit = async (values) => {
    if (!values.hatchery) return;

    setIsSave(true);

    values.pond = pondId;

    try {
      let data = await (
        await fetch("/api/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.browser
              ? localStorage.getItem("token")
              : null,
          },
          body: JSON.stringify(values),
        })
      ).json();

      const { pond, product } = data;

      mutate(
        [
          `/api/pond/${pondId}`,
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          return pond;
        },
        false
      );

      mutate(
        [
          `/api/pond/${pondId}/product`,

          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          return product;
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
      <Button
        mt="1rem"
        onClick={onOpen}
        colorScheme="teal"
        variant="solid"
        transition="350ms all"
      >
        Thả con giống
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thả con giống xuống ao</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Tên con giống: </FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                {...register("name", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="stockingDensity">
                Mật độ thả nuôi (con/mét vuông)
              </FormLabel>
              <Input
                type="number"
                id="stockingDensity"
                name="stockingDensity"
                {...register("stockingDensity", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="stockingDate">Ngày thả giống</FormLabel>
              <DatePicker control={control} name="stockingDate" />
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
                {...register("seedAge", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="hatchery">Trại giống:</FormLabel>
              {data?.defaultHatcheries?.length > 0 ? (
                <Select
                  id="hatchery"
                  name="hatchery"
                  {...register("hatchery", { required: true })}
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

export default AddSeedModal;
