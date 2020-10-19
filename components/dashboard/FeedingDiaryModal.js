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
      <Text>Nhật ký cho ăn</Text> <Box as={FaFish} size="32px" mt={4} />
      {/* TODO: How the fuck to add transition into Modal  */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Nhật ký cho ăn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="ghiChu">Ghi chú: </FormLabel>
              <Input
                type="text"
                id="ghiChu"
                name="ghiChu"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="khoiLuong">Khối lượng(kg): </FormLabel>
              <Input
                type="text"
                id="khoiLuong"
                name="khoiLuong"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="aoTen">Ao tên: </FormLabel>
              <Select
                id="aoTen"
                name="aoTen"
                ref={register({
                  required: "Required",
                })}
              >
                <option value="CC">Pond 1</option>
                <option value="CC1">Pond 2</option>
                <option value="CC2">Pond 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="note">Thức ăn: </FormLabel>
              <Select
                id="tenThucAn"
                name="tenThucAn"
                ref={register({
                  required: "Required",
                })}
              >
                <option value="pond1">Loại A1</option>
                <option value="pond2">Loại A2</option>
                <option value="pond3">Loại A3</option>
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
