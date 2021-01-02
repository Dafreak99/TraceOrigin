import {
  Text,
  Flex,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Select,
  Spinner,
  Image,
  AlertIcon,
  Alert,
  Box,
} from "@chakra-ui/core";
import Modal from "antd/lib/modal/Modal";

import { useForm } from "react-hook-form";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { useState } from "react";
import DatePicker from "../DatePicker";
import FormControl from "./FormControl";

const FeedingDiaryModal = ({ bg, color, icon }) => {
  const [visible, setVisible] = useState(false);

  const [isSave, setIsSave] = useState(false);

  const { handleSubmit, register, errors, control, reset } = useForm();
  const [selectedFood, setSelectedFood] = useState(null);

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
    setIsSave(true);
    // Date and time format HH:mm' 'dd/MM/yyyy
    try {
      await fetch("/api/feedingdiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            // REPLACE WITH USER TOKEN
            process.browser ? localStorage.getItem("token") : null,

          // "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
    }

    reset();
    setVisible(false);
    setIsSave(false);
  };

  const onChangeFoodOption = (e) => {
    let matchedFood = data.find((food) => food._id === e.target.value);
    setSelectedFood(matchedFood);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Box className="diary-boxx" onClick={() => setVisible(true)}>
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
      {/* Render out modal */}

      <Modal
        visible={visible}
        onCancel={handleCancel}
        title="Nhật ký cho ăn"
        footer={null}
      >
        {data && data.length > 0 && ponds && ponds.length > 0 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <FormLabel htmlFor="ngayThangNam">Ngày tháng năm: </FormLabel>
              <DatePicker control={control} name="ngayThangNam" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ghiChu">Ghi chú: </FormLabel>
              <Input type="text" id="ghiChu" name="ghiChu" ref={register()} />
            </FormControl>
            <ModalFooter>
              <Button
                variantColor="blue"
                mr={3}
                onClick={() => {
                  console.log(visible);
                  setVisible(!visible);
                  console.dir(setVisible);
                }}
              >
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
          </form>
        ) : (
          <Alert status="warning">
            <AlertIcon />
            Vui lòng đảm bảo rằng dữ liệu của thức ăn hoặc ao không bị rỗng
          </Alert>
        )}
      </Modal>
    </>
  );
};

export default FeedingDiaryModal;
