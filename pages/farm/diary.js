import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/core";

import DailyNoteModal from "@/components/dashboard/DailyNoteModal";
import FeedingDiaryModal from "@/components/dashboard/FeedingDiaryModal";
import PondEnviromentModal from "@/components/dashboard/PondEnviromentModal";

import Layout from "@/components/dashboard/Layout";
import UsingMedicineDiary from "@/components/dashboard/UsingMedicineDiary";
import { FaFish } from "react-icons/fa";
import { RiStickyNoteFill } from "react-icons/ri";
import { BiWater } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";
import DiaryBox from "@/components/dashboard/DiaryBox";
import { useState } from "react";

const DashBoard = () => {
  const boxes = [
    // <FeedingDiaryModal bg=""/>
    {
      bg: "#f1dbf4",
      color: "#d038d0",
      icon: FaFish,
      modal: "feeding",
    },
    {
      bg: "#dbf4e8",
      color: "#38d09f",
      icon: RiStickyNoteFill,
      Modal: FeedingDiaryModal,
    },
    {
      bg: "#fbe2d9",
      color: "#ef5d17",
      icon: BiWater,
      Modal: FeedingDiaryModal,
    },
    {
      bg: "#d9e6fb",
      color: "#1777ef",
      icon: GiMedicines,
      Modal: FeedingDiaryModal,
    },
  ];

  return (
    <Layout>
      <Box px={16} py={12}>
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          columnGap="40px"
          rowGap="40px"
        >
          <FeedingDiaryModal bg="#f1dbf4" color="#d038d0" icon={FaFish} />
          <DailyNoteModal
            bg="#dbf4e8"
            color="#38d09f"
            icon={RiStickyNoteFill}
          />
          <PondEnviromentModal bg="#fbe2d9" color="#ef5d17" icon={BiWater} />
          <UsingMedicineDiary bg="#d9e6fb" color="#1777ef" icon={GiMedicines} />

          {/* {boxes.map((box) => (
            <DiaryBox {...box} />
          ))} */}
        </Grid>
      </Box>
    </Layout>
  );
};

export default DashBoard;
