import { useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import useSWR from "swr";

import AddPondModal from "./AddPondModal";
import fetcher from "../../utils/fetcher";

const Ponds = () => {
  const ponds = ["Pond no.1", "Pond no.2", "aaaaaaa", "bbbbbbbb"];

  const { data, error } = useSWR(
    [
      "/api/pond",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Flex
      align="center"
      direction="column"
      w="20vw"
      backgroundColor="#f9fcff"
      minH="100vh"
      px={4}
      py={8}
    >
      <AddPondModal />
      <Grid gridTemplateColumns="repeat(2, 1fr)" w="100%" columnGap="1rem">
        {data &&
          data.map((pond) => (
            <Flex
              height="5rem"
              justify="center"
              align="center"
              backgroundColor="#fff"
              boxShadow="0 4px 8px rgb(220 229 236)"
              borderRadius="5px"
              mb={4}
              ref={btnRef}
              onClick={onOpen}
            >
              <Text fontSize="xl">{pond.pondName}</Text>
            </Flex>
          ))}
      </Grid>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            Add Some Infomartion About A Specific Pond HERE !!!!
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Ponds;
