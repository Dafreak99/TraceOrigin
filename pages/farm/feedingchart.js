import { Box, Select, Text } from "@chakra-ui/core";

import Layout from "@/components/dashboard/Layout";
import FeedingChart from "@/components/dashboard/FeedingChart";

const FeedingChartPage = () => {
  return (
    <Layout>
      <Box px={16} py={12}>
        <Text mb={8}>Feeding Chart</Text>
        <Select w="300px">
          <option value="option1">Ao 1</option>
          <option value="option2">Ao 2</option>
          <option value="option3">Ao 3</option>
        </Select>
      </Box>
      <FeedingChart />
    </Layout>
  );
};

export default FeedingChartPage;
