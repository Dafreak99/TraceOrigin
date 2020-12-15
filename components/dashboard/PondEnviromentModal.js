import fetcher from "@/utils/fetcher";
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
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import DatePicker from "../DatePicker";

import FormControl from "./FormControl";

const PondEnvironmentModal = () => {
  const { handleSubmit, register, errors, control, reset } = useForm();
  const [isSave, setIsSave] = useState(false);
  const [visible, setVisible] = useState(false);

  const { data: ponds } = useSWR(
    [
      "/api/pond",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  const showModal = () => setVisible(true);

  const handleCancel = () => setVisible(false);

  const onSubmit = async (values) => {
    setIsSave(true);

    // Parse to number
    values.oxy = +values.oxy;
    values.ph = +values.ph;
    values.doTrong = +values.doTrong;
    values.doMan = +values.doMan;
    values.H2S = +values.H2S;
    values.NH3 = +values.NH3;
    values.doKiem = +values.doKiem;

    try {
      let res = await fetch("/api/pondenvironment", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
    }

    setIsSave(false);
    reset();
    setVisible(false);
  };

  return (
    <>
      <Flex onClick={showModal} className="diary-box">
        <Text fontWeight="bold" marginBottom="2rem">
          Môi trường ao
        </Text>
        <Image src="/004-sea.svg" />
      </Flex>

      <Modal
        visible={visible}
        title="Môi trường ao"
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
            <FormLabel htmlFor="ao">Ao sử dụng:</FormLabel>
            {ponds && ponds.length > 0 && (
              <Controller
                name="ao"
                control={control}
                defaultValue={ponds[0]._id}
                rules={{ required: true }}
                render={({ onChange }) => (
                  <Select
                    onChange={onChange}
                    style={{ width: "100%" }}
                    defaultValue={ponds[0].tenAo}
                  >
                    {ponds.map((pond) => (
                      <Option value={pond._id}>{pond.tenAo}</Option>
                    ))}
                  </Select>
                )}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="ngayThangNam">Ngày ghi: </FormLabel>
            <DatePicker control={control} name="ngayThangNam" />
            {errors.ngayThangNam?.type === "required" && (
              <Text fontSize="md" fontStyle="italic" color="red.300">
                Vui lòng nhập ngày
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="oxy">Oxy(mg/l): </FormLabel>
            <Input
              type="number"
              id="oxy"
              name="oxy"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="ph">Độ pH: </FormLabel>
            <Input
              type="number"
              id="ph"
              name="ph"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="doTrong">Độ trong(cm): </FormLabel>
            <Input
              type="number"
              id="doTrong"
              name="doTrong"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="doMan">Độ mặn(o/ oo): </FormLabel>
            <Input
              type="number"
              id="doMan"
              name="doMan"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="H2S">HS2(mg/l): </FormLabel>
            <Input
              type="number"
              id="H2S"
              name="H2S"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="NH3">NH3(mg/l) </FormLabel>
            <Input
              type="number"
              id="NH3"
              name="NH3"
              ref={register({
                required: "Required",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="doKiem">Độ kiểm(mg/l): </FormLabel>
            <Input
              type="number"
              id="doKiem"
              name="doKiem"
              ref={register({
                required: "Required",
              })}
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

export default PondEnvironmentModal;
