import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  SlideIn,
  Scale,
} from "@chakra-ui/core";
import { motion, transform } from "framer-motion";
function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    // {"willChange":"opacity, transform","opacity":1,"transform":"scale(1)"}
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Scale in={isOpen} initialScale="0.5">
        {(styles) => (
          <>
            {console.log(styles)}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay opacity={styles.opacity} />
              <ModalContent {...styles}>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>ccc {JSON.stringify(styles)}</ModalBody>

                <ModalFooter>
                  <Button variantColor="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Scale>
    </>
  );
}

export default BasicUsage;
