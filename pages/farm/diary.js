import { Box, Grid } from "@chakra-ui/core";

import DailyNoteModal from "@/components/dashboard/DailyNoteModal";
import FeedingDiaryModal from "@/components/dashboard/FeedingDiaryModal";
import PondEnviromentModal from "@/components/dashboard/PondEnviromentModal";

import Layout from "@/components/dashboard/Layout";
import UsingMedicineDiary from "@/components/dashboard/UsingMedicineDiary";

const DashBoard = () => {
  return (
    <Layout>
      <Box px={16} py={12}>
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          columnGap="40px"
          rowGap="40px"
        >
          <FeedingDiaryModal />
          <DailyNoteModal />
          <PondEnviromentModal />
          <UsingMedicineDiary />
        </Grid>
      </Box>
    </Layout>
  );
};

export default DashBoard;
