import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
  Box,
} from "@chakra-ui/core";

import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { Controller, useForm } from "react-hook-form";
import { Divider, Button as AntdButton, Select } from "antd";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";

import FormControl from "./FormControl";
import { mutate } from "swr";
import Map from "../Map";
import { AiOutlinePlus } from "react-icons/ai";

const AddPackingMethod = ({ productId }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entry, setEntry] = useState(null);

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    setIsSave(true);

    values.productId = productId;

    try {
      let res = await fetch("/api/packingmethod", {
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

    setVisible(false);
    setEntry(null);
    reset();
    setIsSave(false);
  };
  return (
    <>
      <Button onClick={showModal}>
        <Box as={AiOutlinePlus} mr="5px" />
        Đóng gói
      </Button>
      <Modal
        visible={visible}
        title="Thêm cách đóng gói"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="packingMethod">Cách đóng gói</FormLabel>
            <Controller
              name="packingMethod"
              control={control}
              defaultValue="Túi PE"
              rules={{ required: true }}
              render={({ onChange }) => (
                <Select
                  size="large"
                  onChange={onChange}
                  style={{ width: "100%" }}
                  defaultValue="Túi PE"
                >
                  <Option value="Túi PE">Túi PE</Option>
                  <Option value="Thùng xốp">Thùng xốp</Option>
                  <Option value="Hộp nhựa">Hộp nhựa</Option>
                </Select>
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Mô tả</FormLabel>
            <Input
              type="text"
              id="description"
              name="description"
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

export default AddPackingMethod;
