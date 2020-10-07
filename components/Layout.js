import { Flex } from "@chakra-ui/core";

import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";

// Common layout for Dashboard
const Layout = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <DashboardContent>{children}</DashboardContent>
    </Flex>
  );
};

export default Layout;
