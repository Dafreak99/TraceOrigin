import {
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
import { useForm } from "react-hook-form";
import { format } from "date-fns";

export const AddSeafoodModal = ({ pondId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values) => {
    try {
      let res = await fetch("/api/pond/utilize", {
        method: "POST",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify({ ...values, pondId }),
      });

      let data = await res.json();
    } catch (error) {
      console.log(error.message);
    }

    onClose();
  };

  return (
    <>
      <Button mt={8} onClick={onOpen}>
        Sử dụng ao
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Thêm thông tin về thủy sản nuôi tại ao</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="seedName">Tên con giống: </FormLabel>
              <Input
                type="text"
                id="seedName"
                name="seedName"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="seedQuantity">Số lượng: </FormLabel>
              <Input
                type="text"
                id="seedQuantity"
                name="seedQuantity"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cultivateDate">Ngày thả giống: </FormLabel>
              <Input
                type="text"
                id="cultivateDate"
                name="cultivateDate"
                defaultValue={format(new Date(), "dd/MM/yyyy")}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="seedFarmName">Tên trại giống: </FormLabel>
              <Input
                type="text"
                id="seedFarmName"
                name="seedFarmName"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="seedFarmAddress">
                Địa chỉ trại giống:
              </FormLabel>
              <Input
                type="text"
                id="seedFarmAddress"
                name="seedFarmAddress"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="seedImportDate">Ngày nhập giống:</FormLabel>
              <Input
                type="text"
                id="seedImportDate"
                name="seedImportDate"
                defaultValue={format(new Date(), "dd/MM/yyyy")}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="seedAge">Ngày tuổi của con giống:</FormLabel>
              <Input
                type="text"
                id="seedAge"
                name="seedAge"
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
    </>
  );
};

export default AddSeafoodModal;
