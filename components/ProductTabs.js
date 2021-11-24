import {
  Box,
  Heading,
  Flex,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Tab,
} from "@chakra-ui/react";
import React from "react";
import FoodChainTimeline from "./FoodChainTimeline";
import GreenDot from "./GreenDot";
import DisplayMap from "@/components/DisplayMap";
import { Tab1 } from "./ProductInfo";

const ProductTabs = ({ data, consumption, mapSource }) => {
  return (
    <Box
      m="40px 0"
      bg="#fff"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
      borderRadius="10px"
      boxShadow="0 2px 4px rgb(57 70 106 / 10%)"
    >
      {/* <Tabs isFitted>
        <TabList mb="1em">
          <Tab>THÔNG TIN SẢN PHẨM</Tab>
          <Tab>TRUY XUẤT NGUỒN GỐC</Tab>
          <Tab>VỊ TRÍ</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tab1 {...data} />
          </TabPanel>
          <TabPanel>
            <FoodChainTimeline data={data} consumption={consumption} />
          </TabPanel>
          <TabPanel>
            {mapSource.length > 0 && (
              <Box height="500px" mb="4rem">
                <Flex alignItems="center" mb="2rem">
                  <GreenDot />
                  <Heading size="md">Bản đồ hành trình sản phẩm</Heading>
                </Flex>
                <DisplayMap data={mapSource} />
              </Box>
            )}{" "}
          </TabPanel>
        </TabPanels>
      </Tabs> */}

      <Tab1 {...data} />

      <FoodChainTimeline data={data} consumption={consumption} />
      {mapSource.length > 0 && (
        <Box mb="4rem">
          <Flex alignItems="center" mb="2rem">
            <GreenDot />
            <Heading size="md">Bản đồ hành trình sản phẩm</Heading>
          </Flex>
          <Box height="500px">
            <DisplayMap data={mapSource} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductTabs;
