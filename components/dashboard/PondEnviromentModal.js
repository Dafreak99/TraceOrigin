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
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/core";
import { Divider, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GrCycle } from "react-icons/gr";
import useSWR from "swr";
import DatePicker from "../DatePicker";

import FormControl from "./FormControl";

const PondEnvironmentModal = ({ bg, color, icon }) => {
  const { handleSubmit, register, errors, control, reset } = useForm();
  const [isSave, setIsSave] = useState(false);
  const [visible, setVisible] = useState(false);

  const { data: ponds } = useSWR(
    ["/api/pond", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const [values, setValues] = useState({
    oxy: null,
    ph: null,
    doTrong: null,
    doMan: null,
    H2S: null,
    NH3: null,
    doKiem: null,
  });

  const showModal = () => setVisible(true);

  const handleCancel = () => setVisible(false);

  const onSubmit = async (values) => {
    setIsSave(true);

    try {
      let res = await fetch("/api/pondenvironment", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.log(error.message);
    }

    setIsSave(false);

    console.log(values);

    reset();
    setVisible(false);
  };

  const randomValues = () => {
    setValues({
      oxy: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      ph: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      doTrong: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      doMan: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      H2S: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      NH3: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      doKiem: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
    });
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
          Môi trường ao
        </Text>
      </Box>

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
          {ponds && ponds.length > 0 ? (
            <>
              <FormControl>
                <FormLabel htmlFor="ao">Ao sử dụng:</FormLabel>

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
                  value={values.oxy}
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
                  value={values.ph}
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
                  value={values.doTrong}
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
                  value={values.doMan}
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
                  value={values.H2S}
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
                  value={values.NH3}
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
                  value={values.doKiem}
                  ref={register({
                    required: "Required",
                  })}
                />
              </FormControl>
              <FormControl gridColumn="span 2">
                <Button onClick={randomValues}>
                  <Box
                    as={GrCycle}
                    h="24px"
                    w="24px"
                    color="#f3f3f3"
                    mr="0.5rem"
                  />
                  Random
                </Button>
              </FormControl>

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
            </>
          ) : (
            <Alert status="warning" gridColumn="span 2">
              <AlertIcon />
              <Text fontSize="md">
                Vui lòng đảm bảo rằng dữ liệu ao không bị trống
              </Text>
            </Alert>
          )}
        </form>
      </Modal>
    </>
  );
};

export default PondEnvironmentModal;
