const { Box } = require("@chakra-ui/core");

const SectionPadding = ({ children }) => {
  return (
    <Box py="10rem" position="relative">
      {children}
    </Box>
  );
};

export default SectionPadding;
