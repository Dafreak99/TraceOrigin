import { Box } from "@chakra-ui/core";

import Layout from "@/components/dashboard/Layout";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const DashBoard = () => {
  const { data, error } = useSWR("/api/business", fetcher);
  console.log(data);

  return (
    <Layout>
      <Box px={16} py={12}>
        <h3>Business</h3>
      </Box>
    </Layout>
  );
};

export default DashBoard;
