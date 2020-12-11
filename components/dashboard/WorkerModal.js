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

const { Option } = Select;

const WorkerModal = () => {
  const [visible, setVisible] = useState(false);

  const [isSave, setIsSave] = useState(false);
  const { handleSubmit, register, errors } = useForm();

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
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });

      let data = await res.json();

      mutate(
        [
          "/api/worker",
          // REPLACE TOKEN
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
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
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="gioiTinh">Giới tính</FormLabel>
            <br />
            <Select name="gioiTinh" ref={register()}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="bangCap">Bằng cấp</FormLabel>
            <Select name="bangCap" ref={register()}>
              <option value="Thạc sĩ">Thạc sĩ</option>
              <option value="Cử nhân">Cử nhân</option>
              <option value="Cấp 3">Cấp 3</option>
              <option value="Cấp 2">Cấp 2</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="nhiemVu">Nhiệm vụ</FormLabel>
            <Input
              type="text"
              id="nhiemVu"
              name="nhiemVu"
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
