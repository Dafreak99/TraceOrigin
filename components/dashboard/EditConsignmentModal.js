import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
} from "@chakra-ui/core";

import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { Controller, useForm } from "react-hook-form";
import { Divider, Button as AntdButton, Select } from "antd";
import { HiPlus } from "react-icons/hi";
import FormControl from "./FormControl";

import useSWR, { mutate } from "swr";
import DatePicker from "../DatePicker";
import fetcher from "@/utils/fetcher";

const EditConsignment = ({ visible, setVisible, data }) => {
  const { maLoHang, manufactureDate, sanPham, _id } = data;

  const { data: products, error } = useSWR(
    [
      "/api/business/product",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const showModal = () => setVisible(true);

  const handleCancel = () => setVisible(false);

  const onSubmit = async (values) => {
    setIsSave(true);

    let res = await fetch(`/api/consignment/${_id}`, {
      method: "PUT",
      body: values,
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify(values),
    });

    mutate(
      [
        "/api/consignment",
        process.browser ? localStorage.getItem("token") : null,
      ],
      async (cachedData) => {
        let index = cachedData.findIndex((each) => each._id === _id);

        return [
          ...cachedData.slice(0, index),
          values,
          ...cachedData.slice(index + 1),
        ];
      },
      false
    );

    setVisible(false);

    setIsSave(false);

    reset();
  };
  return (
    <>
      <AntdButton
        type="primary"
        shape="circle"
        onClick={showModal}
        style={{
          position: "fixed",
          bottom: "4rem",
          right: "5%",
          height: "3rem",
          width: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HiPlus fontSize="28px" />
      </AntdButton>

      <Modal
        visible={visible}
        title="Chỉnh sửa Quy cách đóng gói"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="maLoHang">Mã lô hàng</FormLabel>
            <Input
              type="text"
              id="maLoHang"
              name="maLoHang"
              defaultValue={maLoHang}
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="manufactureDate">Ngày sản xuất</FormLabel>
            <DatePicker
              control={control}
              name="manufactureDate"
              placeholder={manufactureDate}
            />
            {errors.manufactureDate?.type === "required" && (
              <Text fontSize="md" fontStyle="italic" color="red.300">
                Vui lòng nhập ngày
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="sanPham">Sản phẩm</FormLabel>

            {products && products.length > 0 && (
              <Controller
                name="sanPham"
                control={control}
                defaultValue={sanPham._id}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    onChange={onChange}
                    style={{ width: "100%" }}
                    defaultValue={sanPham.name}
                  >
                    {products.map((each) => (
                      <Option value={each._id}>{each.name}</Option>
                    ))}
                  </Select>
                )}
              />
            )}
          </FormControl>

          <Divider style={{ gridColumn: "span 2" }} />

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
      </Modal>
    </>
  );
};

export default EditConsignment;
