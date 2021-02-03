import { useEffect, useRef, useState } from "react";
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
  List,
  ListItem,
  PseudoBox,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";

import AddPondModal from "./AddPondModal";
import fetcher from "../../utils/fetcher";
import AddSeedModal from "./AddSeedModal";
import DisplayMap from "../DisplayMap";

const Ponds = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    ["/api/pond", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  let [index, setIndex] = useState(0);
  let [selectedPond, setSelectedPond] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const onDelete = async () => {
    let res = await fetch("/api/pond", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ pondId: selectedPond._id }),
    });

    mutate(
      ["/api/pond", process.browser ? localStorage.getItem("token") : null],
      async (cachedData) => {
        return [...cachedData.slice(0, index), ...cachedData.slice(index + 1)];
      },
      false
    );

    setSelectedPond({});
    onClose();
  };

  return (
    <Flex>
      <Flex
        align="center"
        direction="column"
        w="20vw"
        backgroundColor="#f9fcff"
        minH="calc(100vh - 64px)"
        px={4}
        py={8}
      >
        <AddPondModal />
        {data && data.length === 0 && (
          <Text fontSize="xl">Bạn chưa thêm mô hình ao!</Text>
        )}
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
                  {pond.tenAo}
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
              Tên ao: {selectedPond.tenAo}
            </DrawerHeader>

            <DrawerBody>
              <Heading size="md" mb={4} mt={4}>
                Thông tin về ao nuôi
              </Heading>

              <List spacing={2}>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Tên ao:{" "}
                    <Box as="span" fontWeight="normal">
                      {selectedPond.tenAo}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Mã ao:{" "}
                    <Box as="span" fontWeight="normal">
                      {selectedPond.maAo}
                    </Box>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontSize="md" fontWeight="medium">
                    Diện tích ao (hecta):{" "}
                    <Box as="span" fontWeight="normal">
                      {selectedPond.dienTich}
                    </Box>
                  </Text>
                </ListItem>
                {selectedPond.seed ? (
                  <ListItem>
                    <Text fontSize="md" fontWeight="medium">
                      Trạng thái:{" "}
                      <Box as="span" fontWeight="normal" color="#2dcc84">
                        Đang được sử dụng
                      </Box>
                    </Text>
                  </ListItem>
                ) : (
                  <>
                    <ListItem>
                      <Text fontSize="md" fontWeight="medium">
                        Trạng thái:{" "}
                        <Box as="span" fontWeight="normal" color="#cc2d48">
                          Trống
                        </Box>
                      </Text>
                    </ListItem>

                    <AddSeedModal
                      pondId={selectedPond._id}
                      onCloseDrawer={onClose}
                    />
                  </>
                )}
              </List>

              {selectedPond.seed && (
                <>
                  <Heading size="md" mt={4} mb={4}>
                    Thông tin con giống
                  </Heading>

                  <List spacing={2}>
                    <ListItem>
                      <Text fontSize="md" fontWeight="medium">
                        Số lượng:{" "}
                        <Box as="span" fontWeight="normal">
                          {selectedPond.seed.soLuongConGiong}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="medium">
                        Ngày tuổi của giống:{" "}
                        <Box as="span" fontWeight="normal">
                          {selectedPond.seed.ngayTuoiGiong}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="medium">
                        Tên trại giống:{" "}
                        <Box as="span" fontWeight="normal">
                          {selectedPond.seed.traiGiong.tenTraiGiong}
                        </Box>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontSize="md" fontWeight="medium">
                        Địa chỉ trại giống:{" "}
                        <Box as="span" fontWeight="normal">
                          {selectedPond.seed.traiGiong.diaChiTraiGiong}
                        </Box>
                      </Text>
                    </ListItem>
                  </List>
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
                Xóa
              </Button>

              {selectedPond.seed && (
                <Button
                  onClick={() =>
                    router.push(`/farm/register/${selectedPond._id}`)
                  }
                >
                  Đăng ký
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Box height="calc(100vh - 64px)" width="100%">
        <DisplayMap entry={{ latitude: 10, longitude: 29 }} />
      </Box>
    </Flex>
  );
};

export default Ponds;
