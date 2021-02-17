import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
  Text,
} from "@chakra-ui/core";

import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { Controller, useForm } from "react-hook-form";
import { Divider, Button as AntdButton, Select } from "antd";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";

import FormControl from "./FormControl";
import useSWR, { mutate } from "swr";
import DatePicker from "../DatePicker";
import fetcher from "@/utils/fetcher";

const AddConsignmentModal = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const { data, error } = useSWR(
    [
      "/api/business/product",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    setIsSave(true);

    try {
      let res = await fetch("/api/consignment", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      mutate(
        [
          "/api/consignment",
          // BUSINESS ACCOUNT USER TOKEN
          process.browser ? localStorage.getItem("token") : null,
          // "eyJhbGciOiJIUzI1NiJ9.NWZkYjFiOWM0MjRkYjUwM2E0OTdjN2Iy.5rpAKpQJ35fR9F_bWwW4vZQc-rRPPqHO_ABVG6Hk9Ao",
        ],
        async (cachedData) => [...cachedData, data],
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setVisible(false);

    reset();
    setIsSave(false);
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
        title="Thêm lô hàng"
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
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="manufactureDate">Ngày sản xuất</FormLabel>
            <DatePicker control={control} name="manufactureDate" />
            {errors.manufactureDate?.type === "required" && (
              <Text fontSize="md" fontStyle="italic" color="red.300">
                Vui lòng nhập ngày
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="sanPham">Sản phẩm</FormLabel>

            {data && data.length > 0 && (
              <Controller
                name="sanPham"
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
                      <Option value={each._id}>{each.name}</Option>
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

export default AddConsignmentModal;
