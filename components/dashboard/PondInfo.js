import { Box, Button, Heading, List, ListItem, Text } from "@chakra-ui/core";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { mutate } from "swr";

import AddSeedModal from "./AddSeedModal";
import Diary from "./Diary";

const PondInfo = ({ index, selectedPond, setSelectedPond }) => {
  const onDelete = async () => {
    await fetch("/api/pond", {
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
    <>
      <Box p="3rem" background="#fff" gridColumn="span 6" position="relative">
        <Heading>{selectedPond.name}</Heading>
        <Heading size="md" mb={4} mt={4}>
          Thông tin về ao nuôi
        </Heading>

        <List spacing={2}>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Tên ao:{" "}
              <Box as="span" fontWeight="normal">
                {selectedPond.name}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Mã ao:{" "}
              <Box as="span" fontWeight="normal">
                {selectedPond.code}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Diện tích ao (hecta):{" "}
              <Box as="span" fontWeight="normal">
                {selectedPond.area}
              </Box>
            </Text>
          </ListItem>
          {selectedPond.seed ? (
            <ListItem>
              <Text fontSize="md" fontWeight="bold">
                Trạng thái:{" "}
                <Box as="span" fontWeight="normal" color="#2dcc84">
                  Đang được sử dụng
                </Box>
              </Text>
            </ListItem>
          ) : (
            <>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
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
                <Text fontSize="md" fontWeight="bold">
                  Tên con giống :{" "}
                  <Box as="span" fontWeight="normal">
                    {selectedPond.seed.name}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Số lượng :{" "}
                  <Box as="span" fontWeight="normal">
                    {selectedPond.seed.quantity}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Ngày tuổi của giống:{" "}
                  <Box as="span" fontWeight="normal">
                    {selectedPond.seed.seedAge}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Tên trại giống:{" "}
                  <Box as="span" fontWeight="normal">
                    {selectedPond.seed.hatchery.name}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Địa chỉ trại giống:{" "}
                  <Box as="span" fontWeight="normal">
                    {selectedPond.seed.hatchery.address}
                  </Box>
                </Text>
              </ListItem>
            </List>
          </>
        )}
        <Box position="absolute" bottom="8%">
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
          {selectedPond?.seed?.isRegistered === "false" && (
            <Button>
              <Link href={`/farm/register/${selectedPond._id}`}>Đăng ký</Link>
            </Button>
          )}
        </Box>
      </Box>
      {selectedPond?.seed?.isRegistered === "true" && (
        <CSSTransition timeout={500} classNames="item">
          <Box
            background="#fff"
            gridColumn="span 6"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Diary pondId={selectedPond._id} />
          </Box>
        </CSSTransition>
      )}
    </>
  );
};

export default PondInfo;
