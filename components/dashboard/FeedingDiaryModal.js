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
  FormHelperText,
} from "@chakra-ui/core";
import { FaFish } from "react-icons/fa";
import { useForm } from "react-hook-form";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { useState } from "react";
import { format } from "date-fns";
import DatePicker from "../DatePicker";

const FeedingDiaryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors } = useForm();
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "dd/MM/yyyy")
  );

  const { data } = useSWR(
    [
      "/api/food",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  const { data: ponds } = useSWR(
    [
      "/api/pond",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  const onSubmit = async (values) => {
    // Date and time format HH:mm' 'dd/MM/yyyy
    values.ngayThangNam = selectedDate;
    try {
      await fetch("/api/feedingdiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            // REPLACE WITH USER TOKEN
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
    }

    onClose();
  };

  const onChangeFoodOption = (e) => {
    let matchedFood = data.find((food) => food._id === e.target.value);
    setSelectedFood(matchedFood);
  };

  return (
    <Flex
      onClick={onOpen}
      borderRadius="5px"
      backgroundColor="black"
      color="#fff"
      p={8}
      direction="column"
      align="center"
    >
      <Text>Nhật ký cho ăn</Text> <Box as={FaFish} size="32px" mt={4} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Nhật ký cho ăn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="ao">Ao tên: </FormLabel>
              <Select
                id="ao"
                name="ao"
                ref={register({
                  required: "Required",
                })}
              >
                {ponds &&
                  ponds.map((pond) => (
                    <option value={pond._id}>{pond.tenAo}</option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="note">Thức ăn: </FormLabel>
              <Select
                id="thucAn"
                name="thucAn"
                ref={register({
                  required: "Required",
                })}
                onChange={onChangeFoodOption}
              >
                {data &&
                  data.map((each) => (
                    <option value={each._id}>{each.tenThucAn}</option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="khoiLuong">Khối lượng(kg): </FormLabel>
              <Input
                type="number"
                id="khoiLuong"
                name="khoiLuong"
                ref={register({
                  required: "Required",
                  max: selectedFood
                    ? selectedFood.soLuong
                    : data && data[0].soLuong,
                })}
              />
              {errors.khoiLuong?.type === "required" && (
                <Text fontSize="md" fontStyle="italic" color="red.300">
                  Vui lòng nhập vào khối lượng thức ăn !
                </Text>
              )}

              {errors.khoiLuong?.type === "max" && (
                <Text fontSize="md" fontStyle="italic" color="red.300">
                  Tối đa là{" "}
                  {selectedFood
                    ? selectedFood.soLuong
                    : data && data[0].soLuong}{" "}
                  kg
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ngayNhap">Ngày tháng năm: </FormLabel>
              <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ghiChu">Ghi chú: </FormLabel>
              <Input type="text" id="ghiChu" name="ghiChu" ref={register()} />
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
    </Flex>
  );
};

export default FeedingDiaryModal;
