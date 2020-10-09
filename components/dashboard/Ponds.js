import { useRef, useState } from "react";
import {
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
  PseudoBox,
  useDisclosure,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";

import AddPondModal from "./AddPondModal";
import fetcher from "../../utils/fetcher";

const Ponds = () => {
  const { data, error } = useSWR(
    [
      "/api/pond",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  let [index, setIndex] = useState(0);
  let [selectedPond, setSelectedPond] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const onDelete = async () => {
    let res = await fetch("/api/pond/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          // REPLACE WITH USER TOKEN
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
      },
      body: JSON.stringify({ pondId: selectedPond._id }),
    });

    mutate(
      [
        "/api/pond",
        "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
      ],
      async (cachedData) => {
        return [...cachedData.slice(0, index), ...cachedData.slice(index + 1)];
      },
      false
    );

    setSelectedPond({});
    onClose();
  };

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
          data.map((pond, i) => (
            <PseudoBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor="#fff"
              boxShadow="0 4px 8px rgb(220 229 236)"
              borderRadius="5px"
              height="5rem"
              mb={4}
              ref={btnRef}
              role="group"
              _hover={{ backgroundColor: "blue.500" }}
              transition="350ms all"
              cursor="pointer"
              onClick={() => {
                setIndex(i);
                setSelectedPond(pond);
                onOpen();
              }}
            >
              <PseudoBox fontSize="xl" _groupHover={{ color: "#fff" }}>
                {pond.pondName}
              </PseudoBox>
            </PseudoBox>
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
          <DrawerCloseButton color="#fff" />

          <DrawerHeader
            background="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(/pexels-photo-3731945.jpeg)"
            height="10rem"
            backgroundSize="cover"
            color="#fff"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {selectedPond.pondName}
          </DrawerHeader>

          <DrawerBody>
            Add Some Infomartion About A Specific Pond HERE !!!!
          </DrawerBody>

          <DrawerFooter>
            <Button
              backgroundColor="red"
              color="red.400"
              _hover={{}}
              _focus={{}}
              mr={3}
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button color="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Ponds;
