import { Box, Heading, Flex } from "@chakra-ui/react";
import React from "react";
import FoodChainTimeline from "./FoodChainTimeline";
import GreenDot from "./GreenDot";
import DisplayMap from "@/components/DisplayMap";
import { Tab1 } from "./ProductInfo";

const ProductTabsTemp = ({ data, consumption, mapSource }) => {
  return (
    <Box
      m="40px 0"
      bg="#fff"
      px={{ base: "20px", md: "40px" }}
      py="50px"
      borderRadius="10px"
      boxShadow="0 2px 4px rgb(57 70 106 / 10%)"
    >
      <Tab1 {...data} />
      <FoodChainTimeline data={data} consumption={consumption} />
      {mapSource.length > 0 && (
        <Box height="500px" mb="4rem">
          <Flex alignItems="center" mb="2rem">
            <GreenDot />
            <Heading size="md">Bản đồ hành trình sản phẩm</Heading>
          </Flex>
          <DisplayMap data={mapSource} />
        </Box>
      )}{" "}
    </Box>
  );
};

export default ProductTabsTemp;
