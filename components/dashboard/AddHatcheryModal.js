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

import { useForm } from "react-hook-form";
import { Divider, Button as AntdButton } from "antd";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";

import FormControl from "./FormControl";
import { mutate } from "swr";
import Map from "../Map";

const AddHatchery = () => {
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

    values.coordinate = entry;

    try {
      let res = await fetch("/api/hatchery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      mutate(
        [
          "/api/hatchery",
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => [...cachedData, data],
        false
      );
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
          background:
            "linear-gradient(90deg, rgba(35,144,246,1) 0%, rgba(11,90,191,1) 100%)",
        }}
      >
        <HiPlus fontSize="28px" />
      </AntdButton>

      <Modal
        visible={visible}
        title="Thêm trại giống"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="name">Tên trại giống</FormLabel>
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
            <FormLabel htmlFor="address">Địa chỉ trại giống: </FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Tọa độ: </FormLabel>
            <Box height="20rem">
              <Map entry={entry} setEntry={setEntry} />
            </Box>
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

export default AddHatchery;
