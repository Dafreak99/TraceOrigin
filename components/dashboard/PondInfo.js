import {
  Box,
  Button,
  Grid,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";

import AddSeedModal from "./AddSeedModal";

const PondInfo = ({ pond }) => {
  const router = useRouter();

  const onDelete = async () => {
    await fetch("/api/pond", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ pondId: pond._id }),
    });

    router.push("/farm/pond");
  };

  return (
    <>
      <Box
        p="3rem"
        background="#fff"
        w="max-content"
        mr={{ base: 0, lg: "2rem" }}
      >
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridGap="4rem">
          {/* First Col */}
          <List spacing={2}>
            <ListItem>
              <Heading size="md" mb={4} mt={4}>
                Thông tin về ao nuôi
              </Heading>
            </ListItem>
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
              </>
            )}
          </List>

          {/* Second Col */}
          {pond.seed ? (
            <List spacing={2}>
              <ListItem>
                <Heading size="md" mt={4} mb={4}>
                  Thông tin con giống
                </Heading>
              </ListItem>
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
                  Ngày thả giống :{" "}
                  <Box as="span" fontWeight="normal">
                    {pond.seed.stockingDate}
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
          ) : (
            <AddSeedModal pondId={pond._id} />
          )}
        </Grid>

        <Box mt="4rem">
          <Button
            colorScheme="red"
            variant="ghost"
            _hover={{}}
            _focus={{}}
            leftIcon={<FaTrash />}
            mr={3}
            left
            onClick={onDelete}
          >
            Xóa ao
          </Button>
          {/* TODO: REREGISTER */}
          {/* {pond?.seed?.isRegistered === "false" && (
            <Button>
              <Link href={`/farm/register/${pond._id}`}>Đăng ký</Link>
            </Button>
          )} */}
        </Box>
      </Box>
    </>
  );
};

export default PondInfo;
