import {
  Text,
  Flex,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Image,
  Spinner,
} from "@chakra-ui/core";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "../DatePicker";

import FormControl from "./FormControl";

const DailyNoteModal = () => {
  const { handleSubmit, register, errors, control } = useForm();
  const [isSave, setIsSave] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  const handleCancel = () => setVisible(false);

  const onSubmit = (values) => console.log(values);

  return (
    <>
      <Flex onClick={showModal} className="diary-box">
        <Text fontWeight="bold" marginBottom="2rem">
          Ghi chú hằng ngày
        </Text>
        <Image src="/002-post-it.svg" />
      </Flex>

      <Modal
        visible={visible}
        title="Ghi chú hằng ngày"
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="note">Ghi chú: </FormLabel>
            <Input
              type="text"
              id="note"
              name="note"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Ngày ghi: </FormLabel>
            <DatePicker control={control} name="date" />
          </FormControl>

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

export default DailyNoteModal;
