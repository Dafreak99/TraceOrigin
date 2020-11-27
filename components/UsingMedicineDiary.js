import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Button,
  Input,
  ModalFooter,
  Spinner,
  Image,
} from "@chakra-ui/core";
import { DatePicker, Divider, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import fetcher from "@/utils/fetcher";

const { Option } = Select;

const UsingMedicineDiary = () => {
  const [visible, setVisible] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "dd/MM/yyyy")
  );

  const [isSave, setIsSave] = useState(false);

  const showModal = () => setVisible(true);

  const { data, error } = useSWR(
    [
      "/api/pond",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

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

  const onSubmit = (values) => {
    console.log(values);
  };

  const onChange = (_, dateString) => {
    setSelectedDate(dateString);
  };

  return (
    <>
      <Flex onClick={showModal} className="diary-box">
        <Text>Sử dụng thuốc</Text>
        <Image src="/003-medicine.svg" />
      </Flex>

      {/* Modal */}
      <Modal
        title="Sử dụng thuốc"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {/* Modal Body*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="tenThuoc">Tên thuốc:</FormLabel>
            <Input type="text" id="tenThuoc" name="tenThuoc" ref={register()} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="ngaythang">Ngày tháng năm:</FormLabel>
            <br />
            <DatePicker
              id="ngaythang"
              name="ngayThang"
              ref={register()}
              placeholder={selectedDate}
              onChange={onChange}
              format="DD/MM/YYYY"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="tenThuoc">Tên thuốc:</FormLabel>
            <Input type="text" id="tenThuoc" name="tenThuoc" ref={register()} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="nguoiTron">Người trộn:</FormLabel>
            <Input
              type="text"
              id="nguoiTron"
              name="nguoiTron"
              ref={register()}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="ao">Ao sử dụng:</FormLabel>
            {data && data.length > 0 && (
              <Select
                defaultValue={data[0].tenAo}
                style={{ width: 120 }}
                ref={register()}
                name="tenAo"
              >
                {data.map((each) => (
                  <Option value={each._id}>{each.tenAo}</Option>
                ))}
              </Select>
            )}
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
        </form>
      </Modal>
    </>
  );
};

export default UsingMedicineDiary;
