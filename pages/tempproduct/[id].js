import { useEffect, useState } from "react";
import {
  Alert,
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
import { Breadcrumb } from "antd";
import { MdDateRange } from "react-icons/md";
import { FaSquareFull } from "react-icons/fa";
import QRCode from "qrcode.react";

import NavbarDrawer from "@/components/NavbarDrawer";
import { transactionsForAsset } from "@/lib/bigchain";
import GreenDot from "@/components/GreenDot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ProductTabsTemp from "@/components/ProductTabsTemp";
import { GiFactory, GiWeight } from "react-icons/gi";
import { FaFish } from "react-icons/fa";

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

  if (!data) {
    return (
      <>
        <Navbar showDrawer={showDrawer} />
        <NavbarDrawer visible={visible} onClose={onClose} />
        <Box py="5rem" minH="700px" bg="#f5f5f582">
          <div className="container">
            <Flex w="100%" h="100%" justify="center" align="center">
              {" "}
              <Spinner />{" "}
            </Flex>
          </div>
        </Box>
        <Footer />
      </>
    );
  }

  const {
    name,
    isHarvested: {
      harvestProduct: { weight, harvestedDate },
    },
    farm: { name: farmName },
  } = data;

  return (
    <>
      <Navbar showDrawer={showDrawer} />
      <NavbarDrawer visible={visible} onClose={onClose} />
      <Box py="5rem" minH="700px" bg="#f7fafc">
        <div className="container">
          <>
            <Box
              bg="#fff"
              px={{ base: "20px", md: "40px" }}
              py="50px"
              borderRadius="10px"
              boxShadow="0 2px 4px rgb(57 70 106 / 10%)"
            >
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
                <Flex align="center">
                  <Box
                    as={BsFillCheckCircleFill}
                    mr="0.5rem"
                    height="1.5rem"
                    width="1.5rem"
                    color="green"
                  />
                  <Box flexWrap="wrap">
                    <Text fontSize="md" overflow="hidden">
                      TransactionID:{" "}
                    </Text>
                    <a
                      target="blank"
                      href={
                        "https://bigchain.tk/api/v1/transactions/" +
                        data.transactionId
                      }
                    >
                      {data.transactionId}
                    </a>
                  </Box>
                </Flex>
              </Alert>

              <Grid
                gridTemplateColumns="repeat(12, 1fr)"
                my={8}
                columnGap={{ base: 0, xl: "4rem" }}
              >
                <Box gridColumn={{ base: "span 12", md: "span 6" }} mb="2rem">
                  <Image src={data.images[0]} borderRadius="10px" />
                </Box>
                <List
                  spacing={3}
                  gridColumn={{ base: "span 12", md: "span 6" }}
                  mb="2rem"
                >
                  <Flex mb={6}>
                    <GreenDot />
                    <Heading fontWeight="bold" fontSize="20px">
                      Thông tin sản phẩm
                    </Heading>
                  </Flex>
                  <ListItem>
                    <Flex align="center">
                      <Box as={FaFish} mr="0.5rem" />
                      <Text fontWeight="bold">
                        Tên sản phẩm:{" "}
                        <Text as="span" fontWeight="normal">
                          {name}
                        </Text>
                      </Text>
                    </Flex>
                  </ListItem>

                  <ListItem>
                    <Flex align="center">
                      <Box as={MdDateRange} mr="0.5rem" />
                      <Text fontWeight="bold">
                        Ngày thu hoạch:{" "}
                        <Text as="span" fontWeight="normal">
                          {harvestedDate}
                        </Text>
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex align="center">
                      <Box as={FaSquareFull} mr="0.5rem" />
                      <Text fontWeight="bold">
                        Đơn vị:{" "}
                        <Text as="span" fontWeight="normal">
                          KG
                        </Text>
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex align="center">
                      <Box as={GiWeight} mr="0.5rem" />
                      <Text fontWeight="bold">
                        Trọng lượng:{" "}
                        <Text as="span" fontWeight="normal">
                          {weight}
                        </Text>
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex align="center">
                      <Box as={GiFactory} mr="0.5rem" />
                      <Text fontWeight="bold">
                        Cơ sở nuôi trồng:{" "}
                        <Text as="span" fontWeight="normal">
                          {farmName}
                        </Text>
                      </Text>
                    </Flex>
                  </ListItem>
                  <QRCode
                    style={{ marginTop: "15px" }}
                    size={100}
                    value={"http://traceorigin.netlify.app/product/" + data._id}
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
                </List>
              </Grid>
            </Box>

            <ProductTabsTemp
              data={data}
              consumption={consumption}
              mapSource={mapSource}
            />
          </>
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
    await fetch(`https://bigchain.tk/api/v1/assets/?search=${params.id}`)
  ).json();

  return {
    props: { data: { ...data[0].data, transactionId: data[0].id } || {} },
  };
}

export default Product;
