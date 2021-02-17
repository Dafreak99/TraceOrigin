import {
  Text,
  Flex,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Spinner,
  Image,
  AlertIcon,
  Alert,
  Box,
} from "@chakra-ui/core";
import Modal from "antd/lib/modal/Modal";

import { Controller, useForm } from "react-hook-form";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { useState } from "react";
import DatePicker from "../DatePicker";
import FormControl from "./FormControl";
import { Select } from "antd";

const FeedingDiaryModal = ({ bg, color, icon }) => {
  const [visible, setVisible] = useState(false);

  const [isSave, setIsSave] = useState(false);

  const { handleSubmit, register, errors, control, reset } = useForm();
  const [selectedFood, setSelectedFood] = useState(null);

  const { data } = useSWR(
    ["/api/food", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const { data: products } = useSWR(
    [
      "/api/product/approved",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const onSubmit = async (values) => {
    setIsSave(true);
    try {
      await fetch("/api/feedingdiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
    }

    reset();
    setVisible(false);
    setIsSave(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Box className="diary-boxx" onClick={() => setVisible(true)}>
        <Flex
          height="60px"
          width="60px"
          borderRadius="15px"
          justify="center"
          align="center"
          backgroundColor={bg}
          margin="0 auto"
        >
          <Box as={icon} height="32px" width="32px" color={color} />
        </Flex>
        <Text fontWeight="bold" fontSize="xl" mt="2rem">
          Cho ăn
        </Text>
      </Box>
      {/* Render out modal */}

      <Modal
        visible={visible}
        onCancel={handleCancel}
        title="Nhật ký cho ăn"
        footer={null}
      >
        {data && data.length > 0 && products && products.length > 0 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="sanPham">Sản phẩm: </FormLabel>

              <Controller
                name="sanPham"
                control={control}
                defaultValue={products[0]._id}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    onChange={onChange}
                    style={{ width: "100%" }}
                    defaultValue={products[0].name}
                  >
                    {products.map((product) => (
                      <Option value={product._id}>{product.name}</Option>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="note">Thức ăn: </FormLabel>

              <Controller
                name="food"
                control={control}
                defaultValue={data[0]._id}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    onChange={onChange}
                    style={{ width: "100%" }}
                    defaultValue={data[0].name}
                  >
                    {data.map((each) => (
                      <Option value={each._id}>{each.name}</Option>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="weight">Khối lượng(kg): </FormLabel>
              <Input
                type="number"
                id="weight"
                name="weight"
                ref={register({
                  required: "Required",
                  max: selectedFood
                    ? selectedFood.weight
                    : data && data[0].weight,
                })}
              />
              {errors.weight?.type === "required" && (
                <Text fontSize="md" fontStyle="italic" color="red.300">
                  Vui lòng nhập vào khối lượng thức ăn !
                </Text>
              )}

              {errors.weight?.type === "max" && (
                <Text fontSize="md" fontStyle="italic" color="red.300">
                  Tối đa là{" "}
                  {selectedFood ? selectedFood.weight : data && data[0].weight}{" "}
                  kg
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="createdDate">Ngày tháng năm: </FormLabel>
              <DatePicker control={control} name="createdDate" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="note">Ghi chú: </FormLabel>
              <Input type="text" id="note" name="note" ref={register()} />
            </FormControl>
            <ModalFooter>
              <Button
                variantColor="blue"
                mr={3}
                onClick={() => {
                  console.log(visible);
                  setVisible(!visible);
                  console.dir(setVisible);
                }}
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
        ) : (
          <Alert status="warning">
            <AlertIcon />
            <Text fontSize="md">
              Vui lòng đảm bảo rằng dữ liệu của thức ăn hoặc ao không bị rỗng
            </Text>
          </Alert>
        )}
      </Modal>
    </>
  );
};

export default FeedingDiaryModal;
