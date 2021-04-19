import AddPondModal from "@/components/dashboard/AddPondModal";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Box, Flex, Heading, List, ListItem, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useSWR from "swr";

const Index = () => {
  const { data, error } = useSWR(
    ["/api/pond", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  return (
    <Layout>
      <Flex align="center" mb={5}>
        <Heading mr="10px">Danh sách ao</Heading>
        <AddPondModal />
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
          <Alert status="warning" gridColumn="span 6">
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
                  gridColumn="span 3"
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
