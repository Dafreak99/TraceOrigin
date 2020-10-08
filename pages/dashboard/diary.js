import { Box, Grid } from "@chakra-ui/core";

import DailyNoteModal from "../../components/dashboard/DailyNoteModal";
import FeedingDiaryModal from "../../components/dashboard/FeedingDiaryModal";
import PondEnviromentModal from "../../components/dashboard/PondEnviromentModal";

import Layout from "../../components/dashboard/Layout";

const DashBoard = () => {
  return (
    <Layout>
      <Box px={16} py={12}>
        <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap="40px">
          <FeedingDiaryModal />
          <DailyNoteModal />
          <PondEnviromentModal />
        </Grid>
      </Box>
    </Layout>
  );
};

export default DashBoard;
