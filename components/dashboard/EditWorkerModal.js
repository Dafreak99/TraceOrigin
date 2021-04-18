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
  useDisclosure,
  Select,
} from "@chakra-ui/react";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { Divider, Button as AntdButton } from "antd";
import FormControl from "./FormControl";

import { mutate } from "swr";

const EditWorkerModal = ({ isOpen, onOpen, onClose, data }) => {
  const {
    name,
    address,
    idCard,
    dateOfBorn,
    gender,
    degree,
    responsibility,
    phone,
    _id,
  } = data;

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const onSubmit = async (values) => {
    setIsSave(true);

    values._id = _id;

    let res = await fetch(`/api/worker/${_id}`, {
      method: "POST",
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
      [
        "/api/worker",
        process.browser ? localStorage.getItem("token") : null,
        ,
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

    onClose();

    setIsSave(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Chỉnh sửa nhân công</ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridGap="4rem"
            size="3xl"
          >
            <FormControl>
              <FormLabel htmlFor="name">Họ và tên</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                defaultValue={name}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="address">Địa chỉ</FormLabel>
              <Input
                type="text"
                id="address"
                name="address"
                defaultValue={address}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">SĐT</FormLabel>
              <Input
                type="text"
                id="phone"
                name="phone"
                defaultValue={phone}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="idCard">CMND</FormLabel>
              <Input
                type="text"
                id="idCard"
                name="idCard"
                defaultValue={idCard}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dateOfBorn">Năm sinh</FormLabel>
              <Input
                type="text"
                id="dateOfBorn"
                name="dateOfBorn"
                defaultValue={dateOfBorn}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="gender">Giới tính</FormLabel>
              <br />

              <Controller
                name="gender"
                defaultValue={gender}
                control={control}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    defaultValue={gender}
                    onChange={onChange}
                    style={{ width: "100%" }}
                  >
                    <Option value="Nam">Nam</Option>
                    <Option value="Nữ">Nữ</Option>
                  </Select>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="degree">Bằng cấp</FormLabel>

              <Controller
                name="degree"
                defaultValue={degree}
                control={control}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    defaultValue={degree}
                    onChange={onChange}
                    style={{ width: "100%" }}
                  >
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Cử nhân">Cử nhân</option>
                    <option value="Cấp 3">Cấp 3</option>
                    <option value="Cấp 2">Cấp 2</option>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="responsibility">Nhiệm vụ</FormLabel>
              <Input
                type="text"
                id="responsibility"
                name="responsibility"
                defaultValue={responsibility}
                ref={register({
                  required: "Required",
                })}
              />
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

export default EditWorkerModal;
