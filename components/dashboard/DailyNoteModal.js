import {
  Text,
  Flex,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Image,
  Spinner,
} from "@chakra-ui/core";
import { DatePicker } from "antd";
import Modal from "antd/lib/modal/Modal";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DailyNoteModal = () => {
  const { handleSubmit, register, errors } = useForm();
  const [isSave, setIsSave] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "dd/MM/yyyy")
  );
  const showModal = () => setVisible(true);

  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (_, dateString) => {
    setSelectedDate(dateString);
  };

  const onSubmit = (values) => console.log(values);

  return (
    <>
      <Flex onClick={showModal} className="diary-box">
        <Text>Nhật ký cho ăn</Text>
        <Image src="/002-post-it.svg" />
      </Flex>

      <Modal
        visible={visible}
        title="Nhập thức ăn"
        // onOk={handleOk}
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
            <DatePicker
              placeholder={selectedDate}
              onChange={onChange}
              format="DD/MM/YYYY"
              id="date"
              name="date"
              ref={register()}
            />
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
