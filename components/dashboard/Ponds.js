import { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import AddPondModal from "./AddPondModal";
import fetcher from "../../utils/fetcher";
import PondInfo from "./PondInfo";

const Ponds = () => {
  const { data, error } = useSWR(
    ["/api/pond", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  let [index, setIndex] = useState(0);
  let [selectedPond, setSelectedPond] = useState(null);

  useEffect(() => {
    if (data) {
      setSelectedPond(data.ponds[index]);
    }
  }, [data]);

  const btnRef = useRef();

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
                    <Box
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
                      <Box fontSize="xl" _groupHover={{ color: "#fff" }}>
                        {pond.name}
                      </Box>
                    </Box>
                  </CSSTransition>
                ))}
            </TransitionGroup>

            <Heading size="md">Chú thích</Heading>
            <Box mb={8}>
              <Flex alignItems="center" mb={4}>
                <Box height="3rem" width="3rem" background="#b4b4b4" mr={4} />
                <Text fontSize="1rem">: Ao được sử dụng</Text>
              </Flex>
              <Flex alignItems="center">
                <Box height="3rem" width="3rem" background="#48e2b0" mr={4} />
                <Text fontSize="1rem">: Ao còn trống</Text>
              </Flex>
            </Box>
          </>
        )}
      </Flex>{" "}
      */}
      <Grid
        height="calc(100vh - 64px)"
        width="100%"
        gridTemplateColumns="repeat(12, 1fr)"
        background="#fff"
      >
        {selectedPond ? (
          <PondInfo
            index={index}
            selectedPond={selectedPond}
            setSelectedPond={setSelectedPond}
          />
        ) : (
          <Box
            background="#fff"
            p="3rem"
            gridColumn="span 12"
            textAlign="center"
          >
            <Heading size="md" mb="4rem">
              Click vào các ao cụ thể để xem thông tin từng ao
            </Heading>
            <Image src="/ponds.svg" width="30rem" margin="auto" />
          </Box>
        )}
      </Grid>
    </Flex>
  );
};

export default Ponds;
