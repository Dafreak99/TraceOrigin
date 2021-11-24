import {
  FormLabel,
  Input,
  Button,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

import { useRef, useState } from "react";

import { useForm } from "react-hook-form";

import FormControl from "./FormControl";

const ChangePasswordModal = ({ id, isOpen, onClose }) => {
  const [isSave, setIsSave] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

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

    onClose();

    setIsSave(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Đổi mật khẩu</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="password">Mật khẩu mới</FormLabel>
              <Input
                type="password"
                id="password"
                {...register("password", { required: true })}
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
                {...register("repassword", {
                  required: true,
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
