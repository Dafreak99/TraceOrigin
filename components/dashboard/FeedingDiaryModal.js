import {
  Text,
  Flex,
  Button,
  FormLabel,
  Input,
  Spinner,
  AlertIcon,
  Alert,
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
import { message } from "antd";
import { Controller, useForm } from "react-hook-form";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { useState } from "react";
import DatePicker from "../DatePicker";
import FormControl from "./FormControl";

const FeedingDiaryModal = ({ bg, color, icon, pondId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSave, setIsSave] = useState(false);

  const { handleSubmit, register, errors, control, reset } = useForm();
  const [selectedFood, setSelectedFood] = useState(null);

  const { data } = useSWR(
    ["/api/food", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const onSubmit = async (values) => {
    setIsSave(true);
    values.pondId = pondId;
    try {
      await fetch("/api/feedingdiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      message.success("Đã ghi nhật ký cho ăn");
    } catch (error) {
      message.error("Lỗi: " + error.message);
      console.log(error.message);
    }
    reset();
    onClose();
    setIsSave(false);
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
          Cho ăn
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Nhật ký cho ăn</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {data?.length > 0 ? (
              <>
                <FormControl>
                  <FormLabel htmlFor="note">Thức ăn: </FormLabel>

                  <Controller
                    name="food"
                    control={control}
                    defaultValue={data[0]._id}
                    rules={{ required: true }}
                    render={({ onChange }) => (
                      <Select
                        onChange={onChange}
                        style={{ width: "100%" }}
                        defaultValue={data[0].name}
                      >
                        {data.map((each) => (
                          <option value={each._id}>{each.name}</option>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="weight">Khối lượng(kg): </FormLabel>
                  <Input
                    type="number"
                    id="weight"
                    name="weight"
                    ref={register({
                      required: "Required",
                      max: selectedFood
                        ? selectedFood.weight
                        : data && data[0].weight,
                      min: 1,
                    })}
                  />
                  {errors.weight?.type === "required" && (
                    <Text fontSize="md" fontStyle="italic" color="red.300">
                      Vui lòng nhập vào khối lượng thức ăn !
                    </Text>
                  )}

                  {errors.weight?.type === "max" && (
                    <Text fontSize="md" fontStyle="italic" color="red.300">
                      Chỉ còn tối đa là{" "}
                      {selectedFood
                        ? selectedFood.weight
                        : data && data[0].weight}{" "}
                      kg. Vui lòng nhập thêm thức ăn
                    </Text>
                  )}
                  {errors.weight?.type === "min" && (
                    <Text fontSize="md" fontStyle="italic" color="red.300">
                      Tối thiểu là 1 kg . Còn lại{" "}
                      {selectedFood
                        ? selectedFood.weight
                        : data && data[0].weight}{" "}
                      kg
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="createdDate">Ngày tháng năm: </FormLabel>
                  <DatePicker control={control} name="createdDate" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="note">Ghi chú: </FormLabel>
                  <Input
                    type="text"
                    id="note"
                    name="note"
                    ref={register({ required: "Required" })}
                  />
                </FormControl>
              </>
            ) : (
              <Alert status="warning">
                <AlertIcon />
                <Text fontSize="md">
                  Vui lòng đảm bảo rằng dữ liệu của thức ăn hoặc ao không bị
                  rỗng
                </Text>
              </Alert>
            )}
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
              <Button
                variant="ghost"
                type="submit"
                disabled={data?.length === 0 && true}
              >
                Lưu
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedingDiaryModal;
