import { Box, Text } from "@chakra-ui/react";

export const Th = (props) => (
  <Text
    as="th"
    textTransform="uppercase"
    fontSize="xs"
    color="gray.500"
    fontWeight="bold"
    px={4}
    border="none"
    {...props}
  />
);

export const Td = (props) => (
  <Box
    as="td"
    color="gray.900"
    background="#fff"
    p={4}
    fontSize={{ base: "sm", xl: "md" }}
    borderBottom="1px solid"
    borderBottomColor="gray.100"
    border="none"
    {...props}
  />
);

export const Tr = (props) => (
  <Box
    as="tr"
    backgroundColor="#fafafa"
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    borderBottom="1px solid"
    borderBottomColor="gray.200"
    height="40px"
    border="none"
    {...props}
  />
);

export const Table = (props) => {
  return (
    <Box
      as="table"
      textAlign="left"
      backgroundColor="white"
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
      {...props}
      border="none"
    />
  );
};
