import { Box, Button, Heading, List, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { mutate } from "swr";

import AddSeedModal from "./AddSeedModal";
import Diary from "./Diary";

const PondInfo = ({ pond }) => {
  const onDelete = async () => {
    await fetch("/api/pond", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ pondId: pond._id }),
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
  };

  return (
    <>
      <Box p="3rem" background="#fff" gridColumn="span 6" position="relative">
        <Heading size="md" mb={4} mt={4}>
          Thông tin về ao nuôi
        </Heading>

        <List spacing={2}>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Tên ao:{" "}
              <Box as="span" fontWeight="normal">
                {pond.name}
              </Box>
            </Text>
          </ListItem>

          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Diện tích ao (hecta):{" "}
              <Box as="span" fontWeight="normal">
                {pond.area}
              </Box>
            </Text>
          </ListItem>
          {pond.seed ? (
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

              <AddSeedModal pondId={pond._id} />
            </>
          )}
        </List>

        {pond.seed && (
          <>
            <Heading size="md" mt={4} mb={4}>
              Thông tin con giống
            </Heading>

            <List spacing={2}>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Tên con giống :{" "}
                  <Box as="span" fontWeight="normal">
                    {pond.seed.name}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Số lượng :{" "}
                  <Box as="span" fontWeight="normal">
                    {pond.seed.quantity}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Ngày tuổi của giống:{" "}
                  <Box as="span" fontWeight="normal">
                    {pond.seed.seedAge}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Tên trại giống:{" "}
                  <Box as="span" fontWeight="normal">
                    {pond.seed.hatchery.name}
                  </Box>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md" fontWeight="bold">
                  Địa chỉ trại giống:{" "}
                  <Box as="span" fontWeight="normal">
                    {pond.seed.hatchery.address}
                  </Box>
                </Text>
              </ListItem>
            </List>
          </>
        )}
        <Box mt="4rem">
          <Button
            colorScheme="red"
            variant="ghost"
            _hover={{}}
            _focus={{}}
            mr={3}
            onClick={onDelete}
          >
            Xóa
          </Button>
          {pond?.seed?.isRegistered === "false" && (
            <Button>
              <Link href={`/farm/register/${pond._id}`}>Đăng ký</Link>
            </Button>
          )}
        </Box>
      </Box>
      {/* {pond?.seed?.isRegistered === "true" && (
        <CSSTransition timeout={500} classNames="item">
          <Box
            background="#fff"
            gridColumn="span 6"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Diary pondId={pond._id} />
          </Box>
        </CSSTransition>
      )} */}
    </>
  );
};

export default PondInfo;
