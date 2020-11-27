import {
  Box,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Select,
  Image,
} from "@chakra-ui/core";
import { FaFish } from "react-icons/fa";
import { useForm } from "react-hook-form";

const PondEnviromentModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <Flex onClick={onOpen} className="diary-box">
      <Text>Môi trường ao</Text>
      <Image src="/004-sea.svg" />

      {/* <Box as={FaFish} size="32px" mt={4} /> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Môi trường ao</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
              <Input
                type="text"
                id="date"
                name="date"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default PondEnviromentModal;
