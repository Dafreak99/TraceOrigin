import { useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  PseudoBox,
  Text,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import AddPondModal from "./AddPondModal";
import fetcher from "../../utils/fetcher";
import AddSeedModal from "./AddSeedModal";

const Ponds = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    ["/api/pond", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  let [index, setIndex] = useState(0);
  let [selectedPond, setSelectedPond] = useState(null);

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
        let ponds = [
          ...cachedData.ponds.slice(0, index),
          ...cachedData.ponds.slice(index + 1),
        ];

        return { ponds, isAuthenticated: cachedData.isAuthenticated };
      },
      false
    );

    setSelectedPond(null);
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
        {data && data.isAuthenticated !== "true" ? (
          <Alert status="warning">
            <AlertIcon />
            <Text fontSize="md">
              Chỉ có thể tiến hành sử dụng ao khi đã chứng thực
            </Text>
          </Alert>
        ) : (
          <>
            <AddPondModal />
            {data && data.length === 0 && (
              <Text fontSize="xl">Bạn chưa thêm mô hình ao!</Text>
            )}

            <TransitionGroup
              className="grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                width: "100%",
                columnGap: "1rem",
                flex: 1,
              }}
            >
              {data &&
                data.ponds.map((pond, i) => (
                  <CSSTransition key={i} timeout={500} classNames="item">
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
                      }}
                    >
                      <PseudoBox fontSize="xl" _groupHover={{ color: "#fff" }}>
                        {pond.name}
                      </PseudoBox>
                    </PseudoBox>
                  </CSSTransition>
                ))}
            </TransitionGroup>

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
          </>
        )}
      </Flex>

      <Box height="calc(100vh - 64px)" width="100%" p="3rem 4rem">
        {selectedPond ? (
          <Box background="#fff" p="3rem">
            <Heading>{selectedPond.name}</Heading>
            <Heading size="md" mb={4} mt={4}>
              Thông tin về ao nuôi
            </Heading>

            <List spacing={2}>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Tên ao:{" "}
                  <Box as="span" fontWeight="normal">
                    {selectedPond.name}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Mã ao:{" "}
                  <Box as="span" fontWeight="normal">
                    {selectedPond.code}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="medium">
                  Diện tích ao (hecta):{" "}
                  <Box as="span" fontWeight="normal">
                    {selectedPond.area}
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
                    setSelectedPond={setSelectedPond}
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
                        {selectedPond.seed.quantity}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="medium">
                      Ngày tuổi của giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {selectedPond.seed.seedAge}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="medium">
                      Tên trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {selectedPond.seed.hatchery.name}
                      </Box>
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="md" fontWeight="medium">
                      Địa chỉ trại giống:{" "}
                      <Box as="span" fontWeight="normal">
                        {selectedPond.seed.hatchery.address}
                      </Box>
                    </Text>
                  </ListItem>
                </List>
              </>
            )}
            <Box mt="8rem">
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

              {!selectedPond?.seed?.isRegistered && (
                <Button
                  onClick={() =>
                    router.push(`/farm/register/${selectedPond._id}`)
                  }
                >
                  Đăng ký
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <Box background="#fff" p="3rem">
            <Heading size="md">
              Click vào các ao cụ thể để xem thông tin từng ao
            </Heading>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Ponds;
