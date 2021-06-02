import AddPondModal from "@/components/dashboard/AddPondModal";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import {
  Box,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useSWR from "swr";

const Index = () => {
  const { data, error } = useSWR(
    ["/api/pond", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <Layout>
        <Flex align="center" mb={5}>
          <Heading mr="10px">Danh sách ao</Heading>
        </Flex>
        <Grid gridTemplateColumns="repeat(4,1fr)" gridGap="2rem">
          <Skeleton height="200px" />
          <Skeleton height="200px" />
          <Skeleton height="200px" />
          <Skeleton height="200px" />
        </Grid>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex align="center" mb={5}>
        <Heading mr="10px">Danh sách ao</Heading>
        {data?.isAuthenticated === "true" && <AddPondModal />}
      </Flex>

      {data && data.length === 0 && (
        <Text fontSize="xl">Bạn chưa thêm mô hình ao!</Text>
      )}
      <TransitionGroup
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridGap: "2rem",
        }}
      >
        {data?.isAuthenticated !== "true" ? (
          <Alert status="warning" gridColumn="span 12">
            <AlertIcon />
            <Text fontSize="md">
              Chỉ có thể tiến hành sử dụng ao khi đã chứng thực
            </Text>
          </Alert>
        ) : (
          <>
            {data?.ponds.length === 0 && (
              <Text fontSize="xl" gridColumn="span 12">
                Bạn chưa thêm mô hình ao!
              </Text>
            )}

            {data?.ponds.map(({ name, area, seed, _id }, i) => (
              <CSSTransition key={i} timeout={500} classNames="item">
                <Flex
                  // gridColumn="span 3"
                  gridColumn={{ base: "span 12", md: "span 6", xl: "span 3" }}
                  backgroundColor="#fff"
                  boxShadow="0 4px 8px rgb(220 229 236)"
                  borderRadius="5px"
                  flexDirection="column"
                  _hover={{ opacity: 0.5 }}
                  transition="350ms all"
                  cursor="pointer"
                  padding="3rem 2rem"
                >
                  <Link href={`./pond/${_id}`}>
                    <a>
                      <List spacing={4}>
                        <ListItem>
                          <Text fontSize="md" fontWeight="bold">
                            Tên ao:{" "}
                            <Box as="span" fontWeight="normal">
                              {name}
                            </Box>
                          </Text>
                        </ListItem>

                        <ListItem>
                          <Text fontSize="md" fontWeight="bold">
                            Diện tích:{" "}
                            <Box as="span" fontWeight="normal">
                              {area}(m2)
                            </Box>
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text fontSize="md" fontWeight="bold">
                            Trạng thái:{" "}
                            <Box as="span" fontWeight="normal">
                              {seed ? (
                                <Box as="span" color="green">
                                  Đang được sử dụng
                                </Box>
                              ) : (
                                <Box as="span" color="red">
                                  Còn trống
                                </Box>
                              )}
                            </Box>
                          </Text>
                        </ListItem>
                      </List>
                    </a>
                  </Link>
                </Flex>
              </CSSTransition>
            ))}
          </>
        )}
      </TransitionGroup>
    </Layout>
  );
};

export default Index;
