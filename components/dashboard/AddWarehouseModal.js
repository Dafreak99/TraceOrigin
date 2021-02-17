import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
} from "@chakra-ui/core";

import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { useForm } from "react-hook-form";

import { Divider, Button as AntdButton } from "antd";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";

import FormControl from "./FormControl";
import { mutate } from "swr";

const AddWarehouse = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    setIsSave(true);

    try {
      let res = await fetch("/api/warehouse", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            // BUSINESS ACCOUNT USER TOKEN
            process.browser ? localStorage.getItem("token") : null,
          // "eyJhbGciOiJIUzI1NiJ9.NWZkYjFiOWM0MjRkYjUwM2E0OTdjN2Iy.5rpAKpQJ35fR9F_bWwW4vZQc-rRPPqHO_ABVG6Hk9Ao",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      mutate(
        [
          "/api/warehouse",

          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          return [...cachedData, data];
        },
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
        title="Thêm nhà kho"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="code">Mã kho</FormLabel>
            <Input
              type="text"
              id="code"
              name="code"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Tên kho: </FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">SĐT liên hệ: </FormLabel>
            <Input
              type="text"
              id="phone"
              name="phone"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email: </FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Địa chỉ: </FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              ref={register({
                required: "Required",
              })}
            />
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

export default AddWarehouse;
