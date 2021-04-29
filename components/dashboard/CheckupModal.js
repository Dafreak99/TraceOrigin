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
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";

import FormControl from "./FormControl";

import fetcher from "@/utils/fetcher";
import DatePicker from "../DatePicker";

const { Option } = Select;

const CheckupModal = ({ bg, color, icon }) => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, control, errors, reset } = useForm();

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

  const { data: products } = useSWR(
    [
      "/api/product/approved",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const { data: workers } = useSWR(
    ["/api/worker", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 3000);
  };

  const onSubmit = async (values) => {
    setIsSave(true);

    values.weight = +values.weight;

    try {
      await fetch("/api/usingmedicine", {
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
          Theo dõi sức khỏe
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Theo dõi sức khỏe</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {medicines?.length > 0 &&
            foods?.length > 0 &&
            products?.length > 0 &&
            workers?.length > 0 ? (
              <>
                <FormControl>
                  <FormLabel htmlFor="sanPham">Sản phẩm: </FormLabel>

                  <Controller
                    name="sanPham"
                    control={control}
                    defaultValue={products[0]._id}
                    rules={{ required: true }}
                    render={({ onChange }) => (
                      <Select
                        onChange={onChange}
                        style={{ width: "100%" }}
                        defaultValue={products[0].name}
                      >
                        {products.map((product) => (
                          <Option value={product._id}>{product.name}</Option>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="medicine">Tên thuốc:</FormLabel>
                  {medicines && medicines.length > 0 && (
                    <Controller
                      name="medicine"
                      defaultValue={medicines[0]._id}
                      control={control}
                      rules={{ required: true }}
                      render={({ onChange }) => (
                        <Select
                          defaultValue={medicines[0].name}
                          onChange={(id) => {
                            handleChangeMedicine(id);
                            onChange(id);
                          }}
                          style={{ width: "100%" }}
                        >
                          {medicines.map((medicine) => (
                            <Option value={medicine._id}>
                              {medicine.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="weight">
                    Khối lượng thuốc(gam):
                    <Input
                      type="number"
                      name="weight"
                      ref={register({
                        required: "Required",
                        max: selectedMedicine
                          ? selectedMedicine.weight
                          : medicines && medicines[0].weight,
                      })}
                    />
                    {errors.weight?.type === "max" && (
                      <Text fontSize="md" fontStyle="italic" color="red.300">
                        Tối đa là{" "}
                        {selectedMedicine
                          ? selectedMedicine.weight
                          : medicines && medicines[0].weight}{" "}
                        kg
                      </Text>
                    )}
                    {selectedMedicine
                      ? selectedMedicine.weight
                      : medicines && medicines[0].weight}
                  </FormLabel>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="createdDate">Ngày tháng năm:</FormLabel>
                  <br />

                  <DatePicker control={control} name="createdDate" />

                  {errors.createdDate?.type === "required" && (
                    <Text fontSize="md" fontStyle="italic" color="red.300">
                      Vui lòng nhập ngày
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="food">Thức ăn:</FormLabel>
                  {foods && foods.length > 0 && (
                    <Controller
                      name="food"
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
                            <Option value={food._id}>{food.name}</Option>
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
                        ref={register({
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
                  <FormLabel htmlFor="worker">Người trộn:</FormLabel>
                  {workers && workers.length > 0 && (
                    <Controller
                      name="worker"
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
                  (medicines?.length > 0 ||
                    foods?.length > 0 ||
                    products?.length > 0 ||
                    workers?.length > 0) &&
                  true
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

export default CheckupModal;
