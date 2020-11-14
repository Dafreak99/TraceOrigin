import DisplayMap from "@/components/DisplayMap";
import FoodChainStepper from "@/components/FoodChainStepper";
import GreenDot from "@/components/GreenDot";
import Navbar from "@/components/Navbar";
import ProductInfo from "@/components/ProductInfo";
import SectionPadding from "@/components/SectionPadding";
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
import { GoPrimitiveDot } from "react-icons/go";

const Product = ({ data }) => {
  const {
    tenSanPham,
    giaSanPham,
    hinhAnh,
    donvi,
    khoiLuong,
    farm: { tenCoSoNuoi, tenChuCoSoNuoi, diaChi, dienTich, sdt, toaDo },
    pond,
  } = data;

  return (
    <>
      <Navbar float />
      <Box py="5rem">
        <div className="container">
          <Heading>Sản phẩm/Tôm sú</Heading>
          <Grid gridTemplateColumns="repeat(12, 1fr)" mt={8}>
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
          <Box h="20rem" w="100%" mt={{ base: "4rem", xl: "10rem" }}>
            <DisplayMap entry={toaDo} />
          </Box>
          <ProductInfo data={data} />
        </div>
      </Box>
    </>
  );
};

export async function getStaticProps() {
  let res = await fetch("https://traceorigin.vercel.app/api/product");

  let data = await res.json();

  console.log("Data", data);

  return {
    props: {
      data,
    },
  };
}

export default Product;
