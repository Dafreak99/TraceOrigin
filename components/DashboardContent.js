import { Box } from "@chakra-ui/core";

const DashboardContent = ({ children }) => {
  return (
    <Box w="85vw" height="100vh" overflowY="scroll" fontSize="50px">
      {children}
    </Box>
  );
};

export default DashboardContent;
