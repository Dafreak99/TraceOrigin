import { useState } from "react";
import { Timeline } from "antd";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import GreenDot from "./GreenDot";
import { format } from "date-fns";

const FoodChainTimeline = ({ data, consumptionDate, consumption }) => {
  const {
    seed: { stockingDate },
    isHarvested: {
      harvestProduct: { harvestedDate },
    },
  } = data;
  const [mode, setMode] = useState("left");

  return (
    <Box gridColumn={{ base: "span 12", xl: "span 6" }}>
      <Flex alignItems="center">
        <GreenDot />
        <Heading size="md">Timeline</Heading>
      </Flex>
      <Timeline mode={mode} style={{ marginTop: "2rem" }}>
        <Timeline.Item label={stockingDate}>
          Thả giống xuống ao nuôi <Image src="/pond.svg" h="40px" />
        </Timeline.Item>
        <Timeline.Item label={harvestedDate}>
          Thu hoạch
          <Image src="/ice-fishing.svg" h="40px" />
        </Timeline.Item>
        {consumption.length > 0 && (
          <Timeline.Item
            label={format(
              new Date(consumption[0].metadata.datetime),
              "dd/MM/yyyy, HH:mm bbb"
            )}
          >
            Điểm tiêu thụ
            <Image src="/store.svg" h="40px" />
          </Timeline.Item>
        )}
      </Timeline>
    </Box>
  );
};

export default FoodChainTimeline;
