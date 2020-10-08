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
} from "@chakra-ui/core";
import { FaFish } from "react-icons/fa";
import { useForm } from "react-hook-form";

const FeedingDiaryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <Flex
      onClick={onOpen}
      borderRadius="5px"
      backgroundColor="black"
      color="#fff"
      p={8}
      direction="column"
      align="center"
    >
      <Text>Cho ăn</Text> <Box as={FaFish} size="32px" mt={4} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Nhật ký cho ăn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="note">Note: </FormLabel>
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
              <FormLabel htmlFor="weight">Weight(gam): </FormLabel>
              <Input
                type="text"
                id="weight"
                name="weight"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="note">Pond: </FormLabel>
              <Select
                id="pondName"
                name="pondName"
                ref={register({
                  required: "Required",
                })}
              >
                <option value="pond1">Pond 1</option>
                <option value="pond2">Pond 2</option>
                <option value="pond3">Pond 3</option>
              </Select>
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

export default FeedingDiaryModal;
