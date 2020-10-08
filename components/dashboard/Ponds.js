import { Box, Flex, Text } from "@chakra-ui/core";

const Ponds = () => {
  const ponds = [
    "Pond no.1",
    "Pond no.2",
    "Pond no.3",
    "Pond no.4",
    "Pond no.5",
    "Pond no.6",
    "Pond no.7",
    "Pond no.8",
  ];

  return (
    <Box w="20vw" backgroundColor="#f9fcff" minH="100vh" px={4} py={8}>
      {ponds.map((pond) => (
        <Flex
          p={16}
          backgroundColor="#fff"
          boxShadow="0 4px 8px rgb(220 229 236)"
          borderRadius="5px"
          direction="column"
          mb={4}
        >
          <Text fontSize="xl">{pond}</Text>
          <Text fontSize="lg">Quantity: 200</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default Ponds;
