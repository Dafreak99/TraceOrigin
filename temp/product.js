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
} from "@chakra-ui/core";
import { useState } from "react";
import { Divider, Breadcrumb } from "antd";

import DisplayMap from "@/components/DisplayMap";
import FoodChainTimeline from "@/components/FoodChainTimeline";
import GreenDot from "@/components/GreenDot";
import Navbar from "@/components/Navbar";
import ProductInfo from "@/components/ProductInfo";
import Footer from "@/components/Footer";

const Product = ({ data }) => {
  const {
    tenSanPham,
    trongLuong,
    hinhAnh,
    donvi,
    farm: { tenCoSoNuoi, tenChuCoSoNuoi, diaChi, dienTich, sdt, toaDo },
    pond,
  } = data;

  const [entry, setEntry] = useState(toaDo);

  return (
    <>
      <Navbar float />
      <Box py="5rem">
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{tenSanPham}</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            my={8}
            columnGap={{ base: 0, xl: "4rem" }}
          >
            <Box gridColumn={{ base: "span 12", xl: "span 6" }}>
              <Image
                src={hinhAnh}
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
                  <Text fontWeight="bold">
                    Tên cơ sở:{" "}
                    <Text as="span" fontWeight="normal">
                      {tenCoSoNuoi}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Chủ cơ sở:{" "}
                    <Text as="span" fontWeight="normal">
                      {tenChuCoSoNuoi}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Địa chỉ:{" "}
                    <Text as="span" fontWeight="normal">
                      {diaChi}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    SĐT:{" "}
                    <Text as="span" fontWeight="normal">
                      {sdt}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Diện tích cơ sở:{" "}
                    <Text as="span" fontWeight="normal">
                      {dienTich} m2
                    </Text>
                  </Text>
                </ListItem>
              </List>
              <Image src="./qrcode.png" mt="2rem" />
            </Box>
          </Grid>
          <Divider />
          <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            columnGap="4rem"
            mt="6rem"
          >
            <ProductInfo data={data} />
            <FoodChainTimeline setEntry={setEntry} />
          </Grid>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  let res = await fetch("https://traceorigin.vercel.app/api/info");

  let data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Product;
