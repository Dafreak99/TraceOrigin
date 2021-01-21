import {
  Select,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalContent,
  FormLabel,
  Input,
  useDisclosure,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/core";
import { Controller, useForm } from "react-hook-form";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, control, reset } = useForm();
  const [isSave, setIsSave] = useState(false);

  const onSubmit = async (values) => {
    if (!values.traiGiong) return;

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
    } catch (error) {
      console.log(error.message);
    }
    setIsSave(false);

    onClose();
    onCloseDrawer();

    router.reload();
  };

  return (
    <>
      <Button mt={8} onClick={onOpen}>
        Sử dụng ao
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thêm thông tin về thủy sản nuôi tại ao</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="soLuongConGiong">Số lượng: </FormLabel>
              <Input
                type="text"
                id="soLuongConGiong"
                name="soLuongConGiong"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ngayThaGiong">Ngày thả giống: </FormLabel>
              <Input
                type="text"
                id="ngayThaGiong"
                name="ngayThaGiong"
                defaultValue={format(new Date(), "dd/MM/yyyy")}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="ngayTuoiGiong">
                Ngày tuổi của con giống:
              </FormLabel>
              <Input
                type="text"
                id="ngayTuoiGiong"
                name="ngayTuoiGiong"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="traiGiong">Trại giống:</FormLabel>
              {data && data.length > 0 ? (
                <Select
                  id="traiGiong"
                  name="traiGiong"
                  ref={register({
                    required: "Required",
                  })}
                >
                  {data.map((each) => (
                    <option value={each._id}>{each.tenTraiGiong}</option>
                  ))}
                </Select>
              ) : (
                <Alert status="warning">
                  <AlertIcon />
                  Vui lòng thêm thông tin trại giống
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
      </Modal>
    </>
  );
};

export default AddSeedModal;
