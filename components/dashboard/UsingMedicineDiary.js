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
import { Divider, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";

import FormControl from "./FormControl";

import fetcher from "@/utils/fetcher";
import DatePicker from "../DatePicker";

const { Option } = Select;

const UsingMedicineDiary = ({ bg, color, icon }) => {
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
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    setIsSave(true);

    values.khoiLuongThuoc = +values.khoiLuongThuoc;

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
        products &&
        products.length > 0 &&
        workers &&
        workers.length > 0 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    defaultValue={products[0].tenSanPham}
                  >
                    {products.map((product) => (
                      <Option value={product._id}>{product.tenSanPham}</Option>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

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
                        <Option value={medicine._id}>
                          {medicine.tenThuoc}
                        </Option>
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
            Vui lòng đảm bảo rằng dữ liệu của thức ăn, thuốc, ao, nhân công
            không bị trống
          </Alert>
        )}
      </Modal>
    </>
  );
};

export default UsingMedicineDiary;
