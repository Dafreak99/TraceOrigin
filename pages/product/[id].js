import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Divider, Breadcrumb } from "antd";

import FoodChainTimeline from "@/components/FoodChainTimeline";
import GreenDot from "@/components/GreenDot";
import Navbar from "@/components/Navbar";
import ProductInfo from "@/components/ProductInfo";
import Footer from "@/components/Footer";

import { useState } from "react";
import NavbarDrawer from "@/components/NavbarDrawer";
import { HiUser } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { FaFax, FaVectorSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineNumber } from "react-icons/ai";
import DisplayMap from "@/components/DisplayMap";

const Product = ({ data }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  let source = [];

  if (data !== undefined) {
    console.log(data);

    const {
      farm,
      seed: { hatchery },
    } = data;

    source = [
      {
        ...farm.coordinate,
        type: "farm",
        _id: farm._id,
        name: farm.name,
        image: farm.images[0],
        address: farm.address,
      },
      {
        ...hatchery.coordinate,
        type: "hatchery",
        _id: hatchery._id,
        name: hatchery.name,
        image: null,
        address: hatchery.address,
      },
    ];
  }

  return (
    <>
      <Navbar showDrawer={showDrawer} />
      <NavbarDrawer visible={visible} onClose={onClose} />
      <Box py="5rem">
        <div className="container">
          {data && (
            <>
              <Breadcrumb>
                <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">{data.name}</a>
                </Breadcrumb.Item>
              </Breadcrumb>
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
                  <Image src="./qrcode.png" mt="2rem" />
                </Box>
              </Grid>
              <Divider />
              <Grid
                gridTemplateColumns="repeat(12, 1fr)"
                columnGap={{ base: 0, xl: "4rem" }}
                rowGap={{ base: "3rem", xl: 0 }}
                mt="6rem"
              >
                <ProductInfo data={data} />
                <FoodChainTimeline data={data} />
              </Grid>
              <Box height="500px">
                <DisplayMap data={source} />
              </Box>
            </>
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

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://traceorigin.vercel.app/api/product/${params.id}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
}

export default Product;
