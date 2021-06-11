import {
  Text,
  Flex,
  Button,
  FormLabel,
  Input,
  Spinner,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { message } from "antd";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrCycle } from "react-icons/gr";
import DatePicker from "../DatePicker";

import FormControl from "./FormControl";

const PondEnvironmentModal = ({ bg, color, icon, pondId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register, errors, control, reset } = useForm();
  const [isSave, setIsSave] = useState(false);

  const [values, setValues] = useState({
    oxy: null,
    ph: null,
    clarity: null,
    salinity: null,
    H2S: null,
    NH3: null,
    alkalinity: null,
  });

  const handleCancel = () => setVisible(false);

  const onSubmit = async (values) => {
    setIsSave(true);

    values.pond = pondId;

    try {
      await fetch("/api/pondenvironment", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });
      message.success("Đã ghi môi trường ao");
    } catch (error) {
      message.error("Lỗi: " + error.message);

      console.log(error.message);
    }

    setIsSave(false);

    reset();
    onClose();
  };

  const randomValues = () => {
    setValues({
      // Math.floor(Math.random() * (max - min + 1)) + min

      oxy: Math.floor(Math.random() * (10 - 4 + 1)) + 4,
      ph: Math.floor(Math.random() * (8.5 - 7.5 + 1)) + 7.5,
      clarity: Math.floor(Math.random() * (40 - 30 + 1)) + 30,
      salinity: Math.floor(Math.random() * (25 - 15 + 1)) + 15,
      H2S: Math.floor(Math.random() * (0.01 - 0.001 + 1)) + 0.001,
      NH3: Math.floor(Math.random() * (0.1 - 0.001 + 1)) + 0.001,
      alkalinity: Math.floor(Math.random() * (120 - 80 + 1)) + 80,
    });
  };

  return (
    <>
      <Box
        className="diary-boxx"
        onClick={onOpen}
        gridColumn={{ base: "span 12", md: "span 6", xl: "span 3" }}
      >
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Môi trường ao</ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display="grid"
            gridTemplateColumns="repeat(2,1fr)"
            gridColumnGap="2rem"
          >
            <FormControl>
              <FormLabel htmlFor="createdDate">Ngày ghi: </FormLabel>
              <DatePicker control={control} name="createdDate" />
              {errors.createdDate?.type === "required" && (
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
              <FormLabel htmlFor="clarity">Độ trong(cm): </FormLabel>
              <Input
                type="number"
                id="clarity"
                name="clarity"
                value={values.clarity}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="salinity">Độ mặn(%): </FormLabel>
              <Input
                type="number"
                id="salinity"
                name="salinity"
                value={values.salinity}
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
              <FormLabel htmlFor="alkalinity">Độ kiểm(mg/l): </FormLabel>
              <Input
                type="number"
                id="alkalinity"
                name="alkalinity"
                value={values.alkalinity}
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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

export default PondEnvironmentModal;
