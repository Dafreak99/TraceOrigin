import {
  Button,
  FormLabel,
  Input,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";

import { mutate } from "swr";

import FormControl from "./FormControl";

export const RejectMessageModal = ({ isOpen, onClose, type }) => {
  const { handleSubmit, register, errors, control, reset } = useForm();

  const [isSave, setIsSave] = useState(false);

  const onSubmit = async (values) => {
    const types = {
      register: "/api/product/register/reject",
      authentication: "authentication",
      harvest: "/api/product/harvest/reject",
      hatchery: "/api/hatchery/reject",
    };

    setIsSave(true);
    try {
      let res = await fetch(types[type], {
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
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalCloseButton />
          <ModalHeader>Từ chối</ModalHeader>
          <ModalBody>
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="150px"
              marginBottom="2rem"
            >
              <AlertIcon boxSize="40px" mr={0} />

              <AlertDescription maxWidth="sm" fontSize="md">
                Vui lòng để lại lời nhắn để cơ sở nuôi trồng biết lí do mình bị
                từ chối !
              </AlertDescription>
            </Alert>

            <FormControl>
              <FormLabel htmlFor="message">Lời nhắn: </FormLabel>
              <Input
                type="text"
                id="message"
                name="message"
                ref={register({
                  required: "Required",
                })}
              />
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

export default RejectMessageModal;