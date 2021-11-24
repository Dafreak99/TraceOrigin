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
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useState } from "react";

import { useForm } from "react-hook-form";

import DatePicker from "../DatePicker";

import FormControl from "./FormControl";

export const RejectMessageModal = ({
  isOpen,
  onClose,
  type,
  hatcheryId,
  productId,
  farmId,
}) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [isSave, setIsSave] = useState(false);

  const onSubmit = async (values) => {
    values.type = type;

    let url, redirectUrl;
    if (type === "hatchery") {
      url = `/api/hatchery/${hatcheryId}`;
      values.resolveType = "reject";
      redirectUrl = "/qualitycontrol/hatchery";
    } else if (type === "register") {
      url = `/api/product/register/reject`;
      values.id = productId;
      redirectUrl = "/qualitycontrol/register";
    } else if (type === "harvest") {
      url = `/api/product/harvest/reject`;
      values.id = productId;
      redirectUrl = "/qualitycontrol/harvest";
    } else if (type === "authentication") {
      url = `/api/enterpriseauthentication/reject`;
      values.farmId = farmId;
      redirectUrl = "/qualitycontrol/authentication";
    }

    setIsSave(true);
    try {
      let res = await fetch(url, {
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
    setIsSave(false);
    reset();
    onClose();

    router.push(redirectUrl);
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
                {...register("message", { required: true })}
              />
            </FormControl>

            <FormControl display="none">
              <FormLabel htmlFor="createdAt">Lời nhắn: </FormLabel>
              <DatePicker control={control} name="createdAt" />
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
