import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/core";

import DailyNoteModal from "@/components/dashboard/DailyNoteModal";
import FeedingDiaryModal from "@/components/dashboard/FeedingDiaryModal";
import PondEnviromentModal from "@/components/dashboard/PondEnviromentModal";
import UsingMedicineDiaryModal from "@/components/dashboard/UsingMedicineDiaryModal";
import CheckupModal from "@/components/dashboard/CheckupModal";

import Layout from "@/components/dashboard/Layout";
import { FaFish } from "react-icons/fa";
import { RiStickyNoteFill } from "react-icons/ri";
import { BiWater } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";
import { useState } from "react";
import { AiFillMedicineBox } from "react-icons/ai";

const DashBoard = () => {
  const boxes = [
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
          <UsingMedicineDiaryModal
            bg="#d9e6fb"
            color="#1777ef"
            icon={GiMedicines}
          />
          <CheckupModal bg="#e1d9fb" color="#6a17ef" icon={AiFillMedicineBox} />
        </Grid>
      </Box>
    </Layout>
  );
};

export default DashBoard;
