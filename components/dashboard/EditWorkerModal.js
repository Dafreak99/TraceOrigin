import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
} from "@chakra-ui/core";

import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { Controller, useForm } from "react-hook-form";
import { Divider, Button as AntdButton, Select } from "antd";
import { HiPlus } from "react-icons/hi";
import FormControl from "./FormControl";

import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";

const { Option } = Select;

const EditWorkerModal = ({ visible, setVisible, data }) => {
  const {
    hoTen,
    diaChi,
    soCMND,
    namSinh,
    gioiTinh,
    bangCap,
    nhiemVu,
    sdt,
    _id,
  } = data;

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();

  const showModal = () => setVisible(true);

  const handleCancel = () => setVisible(false);

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
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
      },
      body: JSON.stringify(values),
    });

    mutate(
      [
        "/api/worker",
        "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
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
            <FormLabel htmlFor="hoTen">Họ và tên</FormLabel>
            <Input
              type="text"
              id="hoTen"
              name="hoTen"
              defaultValue={hoTen}
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="diaChi">Địa chỉ</FormLabel>
            <Input
              type="text"
              id="diaChi"
              name="diaChi"
              defaultValue={diaChi}
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="sdt">SĐT</FormLabel>
            <Input
              type="text"
              id="sdt"
              name="sdt"
              defaultValue={sdt}
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="soCMND">CMND</FormLabel>
            <Input
              type="text"
              id="soCMND"
              name="soCMND"
              defaultValue={soCMND}
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="namSinh">Năm sinh</FormLabel>
            <Input
              type="text"
              id="namSinh"
              name="namSinh"
              defaultValue={namSinh}
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="gioiTinh">Giới tính</FormLabel>
            <br />

            <Controller
              name="gioiTinh"
              defaultValue={gioiTinh}
              control={control}
              rules={{ required: true }}
              render={({ onChange }) => (
                <Select
                  defaultValue={gioiTinh}
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
            <FormLabel htmlFor="bangCap">Bằng cấp</FormLabel>

            <Controller
              name="bangCap"
              defaultValue={bangCap}
              control={control}
              rules={{ required: true }}
              render={({ onChange }) => (
                <Select
                  defaultValue={bangCap}
                  onChange={onChange}
                  style={{ width: "100%" }}
                >
                  <Option value="Thạc sĩ">Thạc sĩ</Option>
                  <Option value="Cử nhân">Cử nhân</Option>
                  <Option value="Cấp 3">Cấp 3</Option>
                  <Option value="Cấp 2">Cấp 2</Option>
                </Select>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="nhiemVu">Nhiệm vụ</FormLabel>
            <Input
              type="text"
              id="nhiemVu"
              name="nhiemVu"
              defaultValue={nhiemVu}
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

export default EditWorkerModal;
