import { Box, Heading } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";

const AddFood = () => {
  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading>Thêm thức ăn cho cơ sở</Heading>
      </Box>
    </Layout>
  );
};

export default AddFood;
