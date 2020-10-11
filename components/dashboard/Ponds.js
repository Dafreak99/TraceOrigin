import { useRef, useState } from "react";
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
  Heading,
  PseudoBox,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";

import AddPondModal from "./AddPondModal";
import fetcher from "../../utils/fetcher";
import AddSeafoodModal from "./AddSeafoodModal";

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

      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        w="100%"
        columnGap="1rem"
        flex="1"
      >
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
              backgroundColor={pond.seed ? "#b4b4b4" : "#48e2b0"}
              color="#fff"
              mb={4}
              ref={btnRef}
              role="group"
              _hover={{ opacity: 0.5 }}
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

      <Heading size="md">Chú thích</Heading>
      <Box mb={8}>
        <Flex alignItems="center" mb={4}>
          <Box height="3rem" width="3rem" background="#b4b4b4" mr={4} />
          <Text fontSize="1rem">: ao đang được sử dụng</Text>
        </Flex>
        <Flex alignItems="center">
          <Box height="3rem" width="3rem" background="#48e2b0" mr={4} />
          <Text fontSize="1rem">: ao còn trống</Text>
        </Flex>
      </Box>

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
            Tên ao: {selectedPond.pondName}
          </DrawerHeader>

          <DrawerBody>
            <Heading size="md" mb={4} mt={4}>
              Thông tin về ao nuôi
            </Heading>
            <Text>Tên ao: {selectedPond.pondName}</Text>
            <Text>Mã ao: {selectedPond.pondCode}</Text>
            <Text>Diện tích ao: {selectedPond.pondAcreage}</Text>
            {selectedPond.seed ? (
              <>
                <Text>
                  Trạng thái:{" "}
                  <Text as="span" color="red.300">
                    Đang được sử dụng
                  </Text>
                </Text>

                <Heading size="md" mt={4} mb={4}>
                  Thông tin con giống
                </Heading>
                <Text>Tên con giống: {selectedPond.seed.seedName}</Text>
                <Text>Số lượng: {selectedPond.seed.seedQuantity}</Text>
                <Text>Ngày nhập giống: {selectedPond.seed.seedImportDate}</Text>
                <Text>Ngày tuổi của giống: {selectedPond.seed.seedAge}</Text>
                <Text>Ngày thả giống: {selectedPond.seed.cultivateDate}</Text>
                <Text>Tên cơ sở bán: {selectedPond.seed.seedFarmName}</Text>
                <Text>
                  Địa chỉ cơ sở bán: {selectedPond.seed.seedFarmAddress}
                </Text>
              </>
            ) : (
              <>
                <Text>
                  Trạng thái:{" "}
                  <Text as="span" color="green.300">
                    Trống
                  </Text>
                </Text>
                <AddSeafoodModal pondId={selectedPond._id} />{" "}
              </>
            )}
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
