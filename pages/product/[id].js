import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Divider, Breadcrumb } from "antd";
import { HiUser } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { FaFax, FaVectorSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import QRCode from "qrcode.react";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineNumber } from "react-icons/ai";

import NavbarDrawer from "@/components/NavbarDrawer";
import DisplayMap from "@/components/DisplayMap";
import { transactionsForAsset } from "@/lib/bigchain";
import FoodChainTimeline from "@/components/FoodChainTimeline";
import GreenDot from "@/components/GreenDot";
import ProductInfo from "@/components/ProductInfo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

const Product = ({ data }) => {
  const router = useRouter();

  const [consumption, setConsumption] = useState([]);
  let [mapSource, setMapSource] = useState([]);

  useEffect(() => {
    async function getData() {
      // Chain of transactions
      if (data) {
        let transactions = await transactionsForAsset(data.transactionId);

        if (transactions.length > 0) {
          const dataForMap = transactions.map(
            ({ metadata: { _id, name, address, coordinate } }) => {
              return {
                coordinate: {
                  latitude: +coordinate.latitude,
                  longitude: +coordinate.longitude,
                },
                type: "consumption",
                _id,
                name,
                address,
              };
            }
          );

          setConsumption(transactions);
          setMapSource((prevState) => [...prevState, ...dataForMap]);
        }
      }
    }

    if (data) {
      const {
        farm,
        seed: { hatchery },
      } = data;

      const source = [
        {
          coordinate: hatchery.coordinate,
          type: "hatchery",
          _id: hatchery._id,
          name: hatchery.name,
          address: hatchery.address,
        },
        {
          coordinate: farm.coordinate,
          type: "farm",
          _id: farm._id,
          name: farm.name,
          address: farm.address,
        },
      ];

      setMapSource(source);
    }

    getData();
  }, [data]);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Navbar showDrawer={showDrawer} />
      <NavbarDrawer visible={visible} onClose={onClose} />
      <Box py="5rem" minH="700px">
        <div className="container">
          {data ? (
            <>
              <Breadcrumb>
                <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">{data.name}</a>
                </Breadcrumb.Item>
              </Breadcrumb>
              <Alert
                status="success"
                my="1rem"
                w={{ base: "100%", md: "max-content" }}
              >
                <AlertIcon />
                <Text fontSize="md" overflow="hidden">
                  TransactionID:{" "}
                  <a
                    target="blank"
                    href={
                      "https://bigchain.tk/api/v1//transactions/" +
                      data.transactionId
                    }
                  >
                    {data.transactionId}
                  </a>
                </Text>
              </Alert>
              <Grid
                gridTemplateColumns="repeat(12, 1fr)"
                my={8}
                columnGap={{ base: 0, xl: "4rem" }}
              >
                <Box gridColumn={{ base: "span 12", xl: "span 6" }}>
                  <Image
                    src={data.images[0]}
                    borderRadius="10px"
                    boxShadow="0 10px 10px rgba(0,0,0,.1)"
                  />
                </Box>
                <Box
                  gridColumn={{ base: "span 12", xl: "span 6" }}
                  mt={{ base: "3rem", xl: 0 }}
                >
                  <Flex alignItems="center">
                    <GreenDot />
                    <Heading size="md">Cơ sở nuôi trồng</Heading>
                  </Flex>
                  <List spacing={3} mt={4}>
                    <ListItem>
                      <Image src={data.farm.images[0]} />
                    </ListItem>
                    <ListItem>
                      <Text
                        fontWeight="bold"
                        textTransform="uppercase"
                        mt="2rem"
                      >
                        {data.farm.name}
                      </Text>
                    </ListItem>

                    <ListItem>
                      <Flex align="center">
                        <Box as={HiUser} mr="0.5rem" />
                        <Text fontWeight="bold">
                          Chủ cơ sở:{" "}
                          <Text as="span" fontWeight="normal">
                            {data.farm.owner}
                          </Text>
                        </Text>
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex align="center">
                        <Box as={MdLocationOn} mr="0.5rem" />
                        <Text fontWeight="bold">
                          Địa chỉ:{" "}
                          <Text as="span" fontWeight="normal">
                            {data.farm.address}
                          </Text>
                        </Text>
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex align="center">
                        <Box as={ImPhone} mr="0.5rem" />
                        <Text fontWeight="bold">
                          Số điện thoại:{" "}
                          <Text as="span" fontWeight="normal">
                            {data.farm.phone}
                          </Text>
                        </Text>
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex align="center">
                        <Box as={FaVectorSquare} mr="0.5rem" />
                        <Text fontWeight="bold">
                          Diện tích cơ sở:{" "}
                          <Text as="span" fontWeight="normal">
                            {data.farm.area} m2
                          </Text>
                        </Text>
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex align="center">
                        <Box as={FaFax} mr="0.5rem" />
                        <Text fontWeight="bold">
                          Fax:{" "}
                          <Text as="span" fontWeight="normal">
                            {data.farm.fax}
                          </Text>
                        </Text>
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex align="center">
                        <Box as={IoIosMail} mr="0.5rem" />
                        <Text fontWeight="bold">
                          Email:{" "}
                          <Text as="span" fontWeight="normal">
                            {data.farm.email}
                          </Text>
                        </Text>
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex align="center">
                        <Box as={CgWebsite} mr="0.5rem" />
                        <Text fontWeight="bold">
                          Website:{" "}
                          <Text as="span" fontWeight="normal">
                            {data.farm.website}
                          </Text>
                        </Text>
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex align="center">
                        <Box as={AiOutlineNumber} mr="0.5rem" />
                        <Text fontWeight="bold">
                          Mã số thuế:{" "}
                          <Text as="span" fontWeight="normal">
                            {data.farm.MST}
                          </Text>
                        </Text>
                      </Flex>
                    </ListItem>
                  </List>
                  <QRCode
                    style={{ marginTop: "15px" }}
                    size={100}
                    value={"http://traceorigin.vercel.app/product/" + data._id}
                  />
                  <Button
                    colorScheme="teal"
                    mt="1rem"
                    onClick={() =>
                      router.push(`/transactions/${data.transactionId}`)
                    }
                  >
                    Xem giao dịch
                  </Button>
                </Box>
              </Grid>
              <Divider />
              <Grid
                gridTemplateColumns="repeat(12, 1fr)"
                columnGap={{ base: 0, xl: "4rem" }}
                rowGap={{ base: "3rem", xl: 0 }}
                mt="6rem"
                mb="4rem"
              >
                <ProductInfo data={data} consumption={consumption} />
                <FoodChainTimeline data={data} consumption={consumption} />
              </Grid>
              {mapSource.length > 0 && (
                <Box height="500px" mb="4rem">
                  <Flex alignItems="center" mb="2rem">
                    <GreenDot />
                    <Heading size="md">Bản đồ hành trình sản phẩm</Heading>
                  </Flex>
                  <DisplayMap data={mapSource} />
                </Box>
              )}
            </>
          ) : (
            <Flex w="100%" h="100%" justify="center" align="center">
              {" "}
              <Spinner />{" "}
            </Flex>
          )}
        </div>
      </Box>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

// In development (next dev), getStaticProps will be called on every request.

export async function getStaticProps({ params }) {
  const data = await (
    await fetch(`https://bigchain.tk/api/v1//assets/?search=${params.id}`)
  ).json();

  return {
    props: { data: { ...data[0].data, transactionId: data[0].id } || {} },
  };
}

export default Product;
