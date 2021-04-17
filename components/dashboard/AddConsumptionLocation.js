import {
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Spinner,
  Box,
  Grid,
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
import { AiOutlinePlus } from "react-icons/ai";

const AddConsumptionLocation = () => {
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
      <Button onClick={showModal}>
        <Box as={AiOutlinePlus} mr="5px" />
        Địa điểm tiêu thụ
      </Button>
      <Modal
        visible={visible}
        title="Thêm địa điểm tiêu thụ"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <Grid
          as="form"
          gridTemplateColumns="repeat(2,1fr)"
          onSubmit={handleSubmit(onSubmit)}
          gridColumnGap="2rem"
        >
          <FormControl>
            <FormLabel htmlFor="name">Tên địa điểm tiêu thụ</FormLabel>
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
            <FormLabel htmlFor="address">SĐT: </FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl style={{ gridColumn: "span 2" }}>
            <FormLabel htmlFor="address">Địa chỉ: </FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <FormControl style={{ gridColumn: "span 2" }}>
            <FormLabel htmlFor="address">Vị trí: </FormLabel>
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
        </Grid>
      </Modal>
    </>
  );
};

export default AddConsumptionLocation;
