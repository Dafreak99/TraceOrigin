import {
  Flex,
  FormLabel,
  Text,
  Button,
  Input,
  ModalFooter,
  Spinner,
  Image,
} from "@chakra-ui/core";
import { Divider, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";

import FormControl from "./FormControl";

import fetcher from "@/utils/fetcher";
import DatePicker from "../DatePicker";

const { Option } = Select;

const UsingMedicineDiary = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [visible, setVisible] = useState(false);
  const { handleSubmit, register, control, errors, reset } = useForm();

  const [isSave, setIsSave] = useState(false);

  const showModal = () => setVisible(true);

  const { data: medicines } = useSWR(
    [
      "/api/medicine",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  const { data: foods } = useSWR(
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

  const { data: workers } = useSWR(
    [
      "/api/worker",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

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
    try {
      await fetch("/api/usingmedicine", {
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
      <Flex onClick={showModal} className="diary-box">
        <Text fontWeight="bold" marginBottom="2rem">
          Sử dụng thuốc
        </Text>
        <Image src="/003-medicine.svg" />
      </Flex>

      {/* Modal */}
      <Modal
        title="Sử dụng thuốc"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="thuoc">Tên thuốc:</FormLabel>
            {medicines && medicines.length > 0 && (
              <Controller
                name="thuoc"
                defaultValue={medicines[0]._id}
                control={control}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    defaultValue={medicines[0].tenThuoc}
                    onChange={(id) => {
                      handleChangeMedicine(id);
                      onChange(id);
                    }}
                    style={{ width: "100%" }}
                  >
                    {medicines.map((medicine) => (
                      <Option value={medicine._id}>{medicine.tenThuoc}</Option>
                    ))}
                  </Select>
                )}
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="khoiLuongThuoc">
              Khối lượng thuốc(gam):
              <Input
                type="number"
                name="khoiLuongThuoc"
                ref={register({
                  required: "Required",
                  max: selectedMedicine
                    ? selectedMedicine.soLuong
                    : medicines && medicines[0].soLuong,
                })}
              />
              {errors.khoiLuongThuoc?.type === "max" && (
                <Text fontSize="md" fontStyle="italic" color="red.300">
                  Tối đa là{" "}
                  {selectedMedicine
                    ? selectedMedicine.soLuong
                    : medicines && medicines[0].soLuong}{" "}
                  kg
                </Text>
              )}
              {selectedMedicine
                ? selectedMedicine.soLuong
                : medicines && medicines[0].soLuong}
            </FormLabel>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="ngayThangNam">Ngày tháng năm:</FormLabel>
            <br />

            <DatePicker control={control} name="ngayThangNam" />

            {errors.ngayThangNam?.type === "required" && (
              <Text fontSize="md" fontStyle="italic" color="red.300">
                Vui lòng nhập ngày
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="thucAn">Thức ăn:</FormLabel>
            {foods && foods.length > 0 && (
              <Controller
                name="thucAn"
                control={control}
                defaultValue={foods[0]._id}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    onChange={onChange}
                    style={{ width: "100%" }}
                    defaultValue={foods[0].tenThucAn}
                  >
                    {foods.map((food) => (
                      <Option value={food._id}>{food.tenThucAn}</Option>
                    ))}
                  </Select>
                )}
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="tyLePhoiTron">Tỷ lệ phối trộn(%):</FormLabel>
            {foods && foods.length > 0 && (
              <>
                <Input
                  type="number"
                  name="tyLePhoiTron"
                  ref={register({
                    required: "Required",
                    max: 100,
                    min: 5,
                  })}
                />
                {errors.tyLePhoiTron?.type === "max" && (
                  <Text fontSize="md" fontStyle="italic" color="red.300">
                    Tối đa là 100%
                  </Text>
                )}
                {errors.tyLePhoiTron?.type === "min" && (
                  <Text fontSize="md" fontStyle="italic" color="red.300">
                    Tối thiểu là 5%
                  </Text>
                )}
              </>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="nguoiTron">Người trộn:</FormLabel>
            {workers && workers.length > 0 && (
              <Controller
                name="nguoiTron"
                control={control}
                defaultValue={workers[0]._id}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    onChange={onChange}
                    style={{ width: "100%" }}
                    defaultValue={workers[0].hoTen}
                  >
                    {workers.map((worker) => (
                      <Option value={worker._id}>{worker.hoTen}</Option>
                    ))}
                  </Select>
                )}
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="ao">Ao sử dụng:</FormLabel>
            {ponds && ponds.length > 0 && (
              <Controller
                name="ao"
                control={control}
                defaultValue={ponds[0]._id}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    onChange={onChange}
                    style={{ width: "100%" }}
                    defaultValue={ponds[0].tenAo}
                  >
                    {ponds.map((pond) => (
                      <Option value={pond._id}>{pond.tenAo}</Option>
                    ))}
                  </Select>
                )}
              />
            )}
          </FormControl>

          <Divider />
          <ModalFooter>
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
      </Modal>
    </>
  );
};

export default UsingMedicineDiary;
