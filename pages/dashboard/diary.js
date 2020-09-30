import { Box, Grid } from "@chakra-ui/core";

import DailyNoteModal from "../../components/DailyNoteModal";
import FeedingDiaryModal from "../../components/FeedingDiaryModal";
import PondEnviromentModal from "../../components/PondEnviromentModal";

import Layout from "./Layout";

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
