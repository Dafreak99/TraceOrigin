import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/core";
import { useRouter } from "next/router";

import Layout from "../../../../components/dashboard/Layout";

const Modify = () => {
  const router = useRouter();

  return (
    <Layout>
      <Box px={16} py={12}>
        Modify Page {router.query.id}
      </Box>
    </Layout>
  );
};

export default Modify;
