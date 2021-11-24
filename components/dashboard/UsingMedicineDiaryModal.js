import fetcher from "@/utils/fetcher";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
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
import { message } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import DatePicker from "../DatePicker";
import FormControl from "./FormControl";

const UsingMedicineDiaryModal = ({ bg, color, icon, pondId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [isSave, setIsSave] = useState(false);

  const { data: medicines } = useSWR(
    [
      "/api/medicine",
      process.browser ? localStorage.getItem("token") : null,
      ,
    ],
    fetcher
  );

  const { data: foods } = useSWR(
    ["/api/food", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const { data: workers } = useSWR(
    ["/api/worker", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const onSubmit = async (values) => {
    setIsSave(true);

    values.pondId = pondId;
    try {
      await fetch("/api/usingmedicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      message.success("Đã ghi nhật ký sử dụng thuốc");
    } catch (error) {
      message.error("Lỗi: " + error.message);

      console.log(error.message);
    }

    setIsSave(false);
    reset();
    onClose();
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
          Sử dụng thuốc
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Sử dụng thuốc</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {medicines?.length > 0 &&
            foods?.length > 0 &&
            workers?.length > 0 ? (
              <>
                <FormControl>
                  <FormLabel htmlFor="medicineId">Tên thuốc:</FormLabel>
                  {medicines && medicines.length > 0 && (
                    <Controller
                      name="medicineId"
                      defaultValue={medicines[0]._id}
                      control={control}
                      rules={{ required: true }}
                      render={({ onChange }) => (
                        <Select
                          defaultValue={medicines[0].name}
                          onChange={onChange}
                          style={{ width: "100%" }}
                        >
                          {medicines.map((medicine) => (
                            <option value={medicine._id}>
                              {medicine.name}
                            </option>
                          ))}
                        </Select>
                      )}
                    />
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="weight">
                    Khối lượng thuốc(kg):
                    <Input
                      type="number"
                      name="weight"
                      {...register("weight", {
                        required: "Required",
                        max: selectedMedicine
                          ? selectedMedicine.weight
                          : medicines && medicines[0].weight,
                        min: 1,
                      })}
                    />
                    {errors.weight?.type === "max" && (
                      <Text fontSize="md" fontStyle="italic" color="red.300">
                        Chỉ còn tối đa là{" "}
                        {selectedMedicine
                          ? selectedMedicine.weight
                          : medicines && medicines[0].weight}{" "}
                        kg. Vui lòng nhập thêm thuốc
                      </Text>
                    )}
                    {errors.weight?.type === "min" && (
                      <Text fontSize="md" fontStyle="italic" color="red.300">
                        Tối thiểu là 1 kg . Còn lại{" "}
                        {selectedMedicine
                          ? selectedMedicine.weight
                          : medicines && medicines[0].weight}{" "}
                        kg
                      </Text>
                    )}
                  </FormLabel>
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
                <FormControl>
                  <FormLabel htmlFor="foodId">Thức ăn:</FormLabel>
                  {foods && foods.length > 0 && (
                    <Controller
                      name="foodId"
                      control={control}
                      defaultValue={foods[0]._id}
                      rules={{ required: true }}
                      render={({ onChange }) => (
                        <Select
                          onChange={onChange}
                          style={{ width: "100%" }}
                          defaultValue={foods[0].name}
                        >
                          {foods.map((food) => (
                            <option value={food._id}>{food.name}</option>
                          ))}
                        </Select>
                      )}
                    />
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="mixingRatio">
                    Tỷ lệ phối trộn(%):
                  </FormLabel>
                  {foods && foods.length > 0 && (
                    <>
                      <Input
                        type="number"
                        name="mixingRatio"
                        {...register("mixingRatio", {
                          required: "Required",
                          max: 100,
                          min: 5,
                        })}
                      />
                      {errors.mixingRatio?.type === "max" && (
                        <Text fontSize="md" fontStyle="italic" color="red.300">
                          Tối đa là 100%
                        </Text>
                      )}
                      {errors.mixingRatio?.type === "min" && (
                        <Text fontSize="md" fontStyle="italic" color="red.300">
                          Tối thiểu là 5%
                        </Text>
                      )}
                    </>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="workerId">Người trộn:</FormLabel>
                  {workers && workers.length > 0 && (
                    <Controller
                      name="workerId"
                      control={control}
                      defaultValue={workers[0]._id}
                      rules={{ required: true }}
                      render={({ onChange }) => (
                        <Select
                          onChange={onChange}
                          style={{ width: "100%" }}
                          defaultValue={workers[0].name}
                        >
                          {workers.map((worker) => (
                            <option value={worker._id}>{worker.name}</option>
                          ))}
                        </Select>
                      )}
                    />
                  )}
                </FormControl>
              </>
            ) : (
              <Alert status="warning">
                <AlertIcon />
                <Text fontSize="md">
                  Vui lòng đảm bảo rằng dữ liệu của thức ăn, thuốc, ao, nhân
                  công không bị trống
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
                disabled={
                  medicines?.length === 0 ||
                  foods?.length === 0 ||
                  (workers?.length === 0 && true)
                }
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

export default UsingMedicineDiaryModal;
