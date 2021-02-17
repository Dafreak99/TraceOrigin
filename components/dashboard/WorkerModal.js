import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
  Select,
} from "@chakra-ui/core";

import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { useForm } from "react-hook-form";
import { Divider, Button as AntdButton } from "antd";
import { HiPlus } from "react-icons/hi";
import FormControl from "./FormControl";
import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import DatePicker from "../DatePicker";

const { Option } = Select;

const WorkerModal = () => {
  const [visible, setVisible] = useState(false);

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control } = useForm();

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    setIsSave(true);

    try {
      let res = await fetch("/api/worker", {
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
        ["/api/worker", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          return [...cachedData, data];
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setVisible(false);

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
          boxShadow: "0 15px 30px rgb(23 65 187 / 34%)",
        }}
      >
        <HiPlus fontSize="28px" />
      </AntdButton>

      <Modal
        visible={visible}
        title="Thêm nhân công"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridColumnGap: "2rem",
          }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Họ và tên</FormLabel>
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
            <FormLabel htmlFor="address">Địa chỉ</FormLabel>
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
            <FormLabel htmlFor="phone">SĐT</FormLabel>
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
            <FormLabel htmlFor="idCard">CMND</FormLabel>
            <Input
              type="text"
              id="idCard"
              name="idCard"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="dateOfBorn">Năm sinh</FormLabel>
            <DatePicker control={control} name="dateOfBorn" />
            {errors.dateOfBorn?.type === "required" && (
              <Text fontSize="md" fontStyle="italic" color="red.300">
                Vui lòng nhập ngày
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="gender">Giới tính</FormLabel>
            <br />
            <Select name="gender" ref={register()}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="degree">Bằng cấp</FormLabel>
            <Select name="degree" ref={register()}>
              <option value="Thạc sĩ">Thạc sĩ</option>
              <option value="Cử nhân">Cử nhân</option>
              <option value="Cấp 3">Cấp 3</option>
              <option value="Cấp 2">Cấp 2</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="responsibility">Nhiệm vụ</FormLabel>
            <Input
              type="text"
              id="responsibility"
              name="responsibility"
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

export default WorkerModal;
