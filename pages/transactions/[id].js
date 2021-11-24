import BackButton from "@/components/dashboard/BackButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { allTransactionsForAsset } from "@/lib/bigchain";
import {
  Box,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getData() {
      const transactions = await allTransactionsForAsset(router.query.id);
      setTransactions(transactions);
    }

    if (router.query.id) {
      getData();
    }
  }, [router.query.id]);

  const Body = () => {
    return (
      <Box className="container" minH="500px" padding="100px 0">
        <Flex align="center" marginBottom="2rem">
          <BackButton />
          <Heading fontSize="xl">Chuỗi khối</Heading>
        </Flex>

        <Grid gridTemplateColumns="repeat(12, 1fr)" gridGap="4rem">
          {transactions.length > 0 &&
            transactions.map(
              ({ operation, metadata: { datetime, type }, id, asset }, i) => (
                <Box
                  gridColumn="span 6"
                  p="4rem 5rem"
                  key={i}
                  background="#fff"
                  boxShadow="0 10px 40px rgb(17 120 247 / 14%)"
                  borderRadius="5px"
                  borderBottom="3px solid #007aff"
                >
                  <Heading fontSize="large" mb="3rem">
                    Block {i + 1}
                  </Heading>
                  <List spacing={4} fontSize="1rem">
                    <ListItem>
                      <Text fontWeight="bold">
                        Hash:{" "}
                        <Text as="span" fontWeight="normal">
                          {id}
                        </Text>
                      </Text>
                    </ListItem>

                    {asset?.id && (
                      <List spacing={4} fontSize="1rem">
                        <ListItem>
                          <Text fontWeight="bold">
                            Prev Hash:{" "}
                            <Text as="span" fontWeight="normal">
                              {asset.id}
                            </Text>
                          </Text>
                        </ListItem>
                      </List>
                    )}
                    <ListItem>
                      <Text fontWeight="bold">
                        OPERATION:{" "}
                        <Text as="span" fontWeight="normal">
                          {operation}
                        </Text>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="bold">
                        Timestamp:{" "}
                        <Text as="span" fontWeight="normal">
                          {datetime}
                        </Text>
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="bold">
                        Type:{" "}
                        <Text as="span" fontWeight="normal">
                          {type}
                        </Text>
                      </Text>
                    </ListItem>
                  </List>
                </Box>
              )
            )}
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <Navbar />
      <Body />
      <Footer />
    </>
  );
};

export default Index;
