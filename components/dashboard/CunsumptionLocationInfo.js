import { List, ListItem, Text, Box } from "@chakra-ui/layout";

const ConsumptionLocation = ({ data }) => {
  return (
    <List
      spacing={2}
      px={16}
      py={12}
      boxShadow="0 4px 10px rgba(0,0,0,.1)"
      w="max-content"
      h="max-content"
      marginRight="2rem"
      background="#fff"
      mb="2rem"
    >
      <ListItem>
        <Text fontSize="md" fontWeight="bold">
          Tên địa điểm tiêu thụ:{" "}
          <Box as="span" fontWeight="normal">
            {data?.name}
          </Box>
        </Text>
      </ListItem>
      <ListItem>
        <Text fontSize="md" fontWeight="bold">
          Địa chỉ:{" "}
          <Box as="span" fontWeight="normal">
            {data?.address}
          </Box>
        </Text>
      </ListItem>
      <ListItem>
        <Text fontSize="md" fontWeight="bold">
          SĐT:{" "}
          <Box as="span" fontWeight="normal">
            {data?.phone}
          </Box>
        </Text>
      </ListItem>
    </List>
  );
};

export default ConsumptionLocation;
