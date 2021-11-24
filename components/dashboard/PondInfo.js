import {
  Box,
  Button,
  Grid,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { FaTrash } from "react-icons/fa";

import AddSeedModal from "./AddSeedModal";
import EditPondModal from "./EditPondModal";
import EditSeedModal from "./EditSeedModal";

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
        gridColumn={{ base: "span 12", lg: "span 7" }}
        mb="2rem"
      >
        <Grid gridTemplateColumns="repeat(12, 1fr)" gridGap="2rem">
          {/* First Col */}
          <List spacing={2} gridColumn={{ base: "span 12", md: "span 5" }}>
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
                Diện tích ao:{" "}
                <Box as="span" fontWeight="normal">
                  {pond.area} (m2)
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

            <EditPondModal data={pond} />
          </List>

          {/* Second Col */}
          {pond.seed ? (
            <List spacing={2} gridColumn={{ base: "span 12", md: "span 7" }}>
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
                  Mật độ thả :{" "}
                  <Box as="span" fontWeight="normal">
                    {pond.seed.stockingDensity} (con/m2)
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
              <EditSeedModal seed={pond.seed} pondId={pond._id} />
            </List>
          ) : (
            <Box gridColumn="span 3">
              <AddSeedModal pondId={pond._id} />
            </Box>
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
        </Box>
      </Box>
    </>
  );
};

export default PondInfo;
