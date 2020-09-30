import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/core";
import Layout from "./Layout";
const Info = () => {
  return (
    <Layout>
      <Box px={16} py={12}>
        <Flex justifyContent="space-between">
          <Heading color="gray.700">Thông Tin Của Bạn</Heading>
          <Button
            backgroundColor="gray.800"
            color="#fff"
            textTransform="uppercase"
          >
            Chỉnh sửa thông tin
          </Button>
        </Flex>

        <List spacing={2} mt={12}>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Họ và tên:{" "}
              <Box as="span" fontWeight="normal">
                Trần Châu Hải
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Loại tài khoản:{" "}
              <Box as="span" fontWeight="normal">
                Nông dân
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Tên trang trại:{" "}
              <Box as="span" fontWeight="normal">
                Trang trại nuôi tôm ABC
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              Địa chỉ trang trại:{" "}
              <Box as="span" fontWeight="normal">
                434 Võ Văn Tần, TP. HCM
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="medium">
              SĐT liên hệ:{" "}
              <Box as="span" fontWeight="normal">
                01203034308
              </Box>
            </Text>
          </ListItem>
        </List>
        <Box mt={12}>
          <Heading mb={12} color="gray.700">
            Hình ảnh trang trại của bạn
          </Heading>

          <Image src="/photo.jpg" height="300px" />
        </Box>
      </Box>
    </Layout>
  );
};

export default Info;
