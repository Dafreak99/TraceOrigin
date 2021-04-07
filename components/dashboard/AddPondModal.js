import {
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/core";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";

import { useForm } from "react-hook-form";

import { mutate } from "swr";

import FormControl from "./FormControl";

export const AddPondModal = () => {
  const { handleSubmit, register, errors, control, reset } = useForm();

  const [visible, setVisible] = useState(false);

  const [isSave, setIsSave] = useState(false);

  const onSubmit = async (values) => {
    setIsSave(true);
    try {
      let res = await fetch("/api/pond", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });

      let data = await res.json();

      mutate(
        ["/api/pond", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          let ponds = [...cachedData.ponds, data];

          return { ponds, isAuthenticated: cachedData.isAuthenticated };
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setIsSave(false);
    reset();
    handleCancel();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        mb={8}
        backgroundColor="gray.300"
        onClick={() => setVisible(true)}
      >
        Thêm ao mới
      </Button>

      <Modal
        visible={visible}
        onCancel={handleCancel}
        title="Thêm ao"
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="name">Tên ao: </FormLabel>
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
            <FormLabel htmlFor="area">Diện tích ao: </FormLabel>
            <Input
              type="number"
              id="area"
              name="area"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="stockingDensity">
              Mật độ thả(Ước lượng số con thả/m3):
            </FormLabel>
            <Input
              type="number"
              id="stockingDensity"
              name="stockingDensity"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <ModalFooter>
            <Button
              variantColor="blue"
              mr={3}
              onClick={() => setVisible(!visible)}
            >
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

export default AddPondModal;
