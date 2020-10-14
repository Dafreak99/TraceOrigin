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

export const AddSeedModal = ({ pondId, onCloseDrawer }) => {
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
    onCloseDrawer();
    // TODO: Update pond status after adding new seed to pond and delete seed if we deleting pond
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
              <FormLabel htmlFor="tenConGiong">Tên con giống: </FormLabel>
              <Input
                type="text"
                id="tenConGiong"
                name="tenConGiong"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="soLuongConGiong">Số lượng: </FormLabel>
              <Input
                type="text"
                id="soLuongConGiong"
                name="soLuongConGiong"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ngayThaGiong">Ngày thả giống: </FormLabel>
              <Input
                type="text"
                id="ngayThaGiong"
                name="ngayThaGiong"
                defaultValue={format(new Date(), "dd/MM/yyyy")}
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tenTraiGiong">Tên trại giống: </FormLabel>
              <Input
                type="text"
                id="tenTraiGiong"
                name="tenTraiGiong"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="diaChiTraiGiong">
                Địa chỉ trại giống:
              </FormLabel>
              <Input
                type="text"
                id="diaChiTraiGiong"
                name="diaChiTraiGiong"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="ngayTuoiGiong">
                Ngày tuổi của con giống:
              </FormLabel>
              <Input
                type="text"
                id="ngayTuoiGiong"
                name="ngayTuoiGiong"
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

export default AddSeedModal;
