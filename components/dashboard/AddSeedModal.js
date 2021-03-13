import {
  Select,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Spinner,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import Modal from "antd/lib/modal/Modal";

import { format } from "date-fns";

import FormControl from "./FormControl";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";

export const AddSeedModal = ({ pondId, onCloseDrawer }) => {
  const router = useRouter();
  const { data, error } = useSWR(
    ["/api/hatchery", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const [visible, setVisible] = useState(false);

  const { handleSubmit, register, errors, control, reset } = useForm();
  const [isSave, setIsSave] = useState(false);

  const onSubmit = async (values) => {
    if (!values.hatchery) return;

    setIsSave(true);
    try {
      let res = await fetch("/api/pond/utilize", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ ...values, pondId }),
      });

      const data = await res.json();

      mutate(
        ["/api/pond", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          let index = cachedData.ponds.findIndex(
            (each) => each._id === data._id
          );

          let ponds = [
            ...cachedData.ponds.slice(0, index),
            data,
            ...cachedData.ponds.slice(index + 1),
          ];

          return { ponds, isAuthenticated: cachedData.isAuthenticated };
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }
    setIsSave(false);

    onClose();
    onCloseDrawer();

    // router.reload();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button mt={8} onClick={() => setVisible(true)}>
        Sử dụng ao
      </Button>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thêm thông tin về thủy sản nuôi tại ao</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="quantity">Số lượng: </FormLabel>
              <Input
                type="text"
                id="quantity"
                name="quantity"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="stockingDate">Ngày thả giống: </FormLabel>
              <Input
                type="text"
                id="stockingDate"
                name="stockingDate"
                defaultValue={format(new Date(), "dd/MM/yyyy")}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="seedAge">Ngày tuổi của con giống:</FormLabel>
              <Input
                type="text"
                id="seedAge"
                name="seedAge"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="hatchery">Trại giống:</FormLabel>
              {data && data.length > 0 ? (
                <Select
                  id="hatchery"
                  name="hatchery"
                  ref={register({
                    required: "Required",
                  })}
                >
                  {data.map((each) => (
                    <option value={each._id}>{each.name}</option>
                  ))}
                </Select>
              ) : (
                <Alert status="warning">
                  <AlertIcon />
                  <Text fontSize="md">Vui lòng thêm thông tin trại giống</Text>
                </Alert>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
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
      </Modal> */}

      <Modal
        visible={visible}
        onCancel={handleCancel}
        title="Nhật ký cho ăn"
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="quantity">Số lượng: </FormLabel>
            <Input
              type="text"
              id="quantity"
              name="quantity"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="stockingDate">Ngày thả giống: </FormLabel>
            <Input
              type="text"
              id="stockingDate"
              name="stockingDate"
              defaultValue={format(new Date(), "dd/MM/yyyy")}
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="seedAge">Ngày tuổi của con giống:</FormLabel>
            <Input
              type="text"
              id="seedAge"
              name="seedAge"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="hatchery">Trại giống:</FormLabel>
            {data && data.length > 0 ? (
              <Select
                id="hatchery"
                name="hatchery"
                ref={register({
                  required: "Required",
                })}
              >
                {data.map((each) => (
                  <option value={each._id}>{each.name}</option>
                ))}
              </Select>
            ) : (
              <Alert status="warning">
                <AlertIcon />
                <Text fontSize="md">Vui lòng thêm thông tin trại giống</Text>
              </Alert>
            )}
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

export default AddSeedModal;
