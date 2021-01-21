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
import { Divider, Button as AntdButton, Select } from "antd";
import { HiPlus } from "react-icons/hi";
import FormControl from "./FormControl";

import { mutate } from "swr";

const EditPackingModal = ({ visible, setVisible, data }) => {
  const { quyCachDongGoi, moTa, _id } = data;

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const showModal = () => setVisible(true);

  const handleCancel = () => setVisible(false);

  const onSubmit = async (values) => {
    setIsSave(true);

    values._id = _id;

    let res = await fetch(`/api/packing/${_id}`, {
      method: "PUT",
      body: values,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          // REPLACE TOKEN
          process.browser ? localStorage.getItem("token") : null,
        // process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify(values),
    });

    mutate(
      ["/api/packing", process.browser ? localStorage.getItem("token") : null],
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
            <FormLabel htmlFor="hoTen">Quy cách đóng gói</FormLabel>
            <Input
              type="text"
              id="quyCachDongGoi"
              name="quyCachDongGoi"
              defaultValue={quyCachDongGoi}
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="moTa">Mô tả</FormLabel>
            <Input
              type="text"
              id="moTa"
              name="moTa"
              defaultValue={moTa}
              ref={register({
                required: "Required",
              })}
            />
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

export default EditPackingModal;
