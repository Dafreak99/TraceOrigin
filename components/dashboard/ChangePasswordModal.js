import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
  ListItem,
  ListIcon,
  Text,
} from "@chakra-ui/core";

import { useRef, useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { useForm } from "react-hook-form";

import { Divider } from "antd";

import FormControl from "./FormControl";

const ChangePasswordModal = ({ id, setRowIndex, visible, setVisible }) => {
  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, reset, watch } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    setIsSave(true);

    values.id = id;

    try {
      let res = await fetch("/api/admin", {
        method: "PUT",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
    } catch (error) {
      console.log(error.message);
    }

    setVisible(false);

    // reset();
    setIsSave(false);
  };
  return (
    <>
      <Modal
        visible={visible}
        title="Đổi mật khẩu"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="password">Mật khẩu mới</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              ref={register({
                required: "Bạn cần nhập mật khẩu",
              })}
            />
            {errors.password?.type === "required" && (
              <Text fontSize="md" fontStyle="italic" color="red.300">
                {errors.password.message}
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="repassword">Nhập lại mật khẩu</FormLabel>
            <Input
              type="password"
              id="repassword"
              name="repassword"
              ref={register({
                validate: (value) =>
                  value === password.current || "Mật khẩu không trùng khớp",
              })}
            />
            {errors.repassword && (
              <Text fontSize="md" fontStyle="italic" color="red.300">
                {errors.repassword.message}
              </Text>
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

export default ChangePasswordModal;
