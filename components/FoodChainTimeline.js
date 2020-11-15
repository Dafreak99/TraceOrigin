import { useState } from "react";
import { Timeline } from "antd";
import { Box, Flex, Heading, Image } from "@chakra-ui/core";
import GreenDot from "./GreenDot";

const FoodChainTimeline = ({ setEntry }) => {
  const [mode, setMode] = useState("left");

  return (
    <Box gridColumn={{ base: "span 12", xl: "span 4" }}>
      <Flex alignItems="center">
        <GreenDot />
        <Heading size="md">
          Timeline(Tìm cách để di chuyển bản đồ khi click vào timeline)
        </Heading>
      </Flex>
      <Timeline mode={mode} style={{ marginTop: "2rem" }}>
        <Timeline.Item label="2015-09-01">
          Nhập giống
          <Image src="/koi-fish.svg" h="40px" />
        </Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">
          Thả giống xuống ao nuôi <Image src="/pond.svg" h="40px" />
        </Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">
          Thu hoạch
          <Image src="/ice-fishing.svg" h="40px" />
        </Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">
          Chế biến
          {/* <Image src="/salmon.svg" h="40px" /> */}
          <Image src="/salmon.svg" h="40px" />
        </Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">
          Vận chuyển đến các điểm tiêu thụ
          <Image src="/shipment.svg" h="40px" />
        </Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">
          Điểm tiêu thụ
          <Image src="/store.svg" h="40px" />
        </Timeline.Item>
      </Timeline>
      <style global jsx>
        {`
          .ant-timeline-item-label,
          .ant-timeline-item-content {
            font-size: 16px;
          }
        `}
      </style>
    </Box>
  );
};

export default FoodChainTimeline;
