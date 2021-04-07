import {
  Flex,
  FormLabel,
  Text,
  Button,
  Input,
  ModalFooter,
  Spinner,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/core";
import { Divider, message, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";

import FormControl from "./FormControl";

import fetcher from "@/utils/fetcher";
import DatePicker from "../DatePicker";

const { Option } = Select;

const UsingMedicineDiaryModal = ({ bg, color, icon, pondId }) => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [visible, setVisible] = useState(false);
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

  const { data: workers } = useSWR(
    ["/api/worker", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  // console.log("Workers", workers);
  // console.log("Foods", foods);
  // console.log("Medicines", medicines);

  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

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
    setVisible(false);
    reset();
  };

  const handleChangeMedicine = (id) => {
    let medicine = medicines.find((medicine) => medicine._id === id);
    setSelectedMedicine(medicine);
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
          Sử dụng thuốc
        </Text>
      </Box>

      {/* Modal */}
      <Modal
        title="Sử dụng thuốc"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body*/}
        {medicines &&
        medicines.length > 0 &&
        foods &&
        foods.length > 0 &&
        workers &&
        workers.length > 0 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      onChange={(id) => {
                        handleChangeMedicine(id);
                        onChange(id);
                      }}
                      style={{ width: "100%" }}
                    >
                      {medicines.map((medicine) => (
                        <Option value={medicine._id}>{medicine.name}</Option>
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
              <br />

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
                        <Option value={food._id}>{food.name}</Option>
                      ))}
                    </Select>
                  )}
                />
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="mixingRatio">Tỷ lệ phối trộn(%):</FormLabel>
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
                        <Option value={worker._id}>{worker.name}</Option>
                      ))}
                    </Select>
                  )}
                />
              )}
            </FormControl>

            <br />
            <ModalFooter gridColumn="span 2">
              <Button variantColor="blue" mr={3} onClick={handleCancel}>
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
            <Text fontSize="md">
              Vui lòng đảm bảo rằng dữ liệu của thức ăn, thuốc, ao, nhân công
              không bị trống
            </Text>
          </Alert>
        )}
      </Modal>
    </>
  );
};

export default UsingMedicineDiaryModal;
