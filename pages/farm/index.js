import EnterpriseAuthenticationModal from "@/components/dashboard/EntepriseAuthenticationModal";
import FarmInfoModify from "@/components/dashboard/FarmInfoModify";
import Layout from "@/components/dashboard/Layout";
import DisplayMap from "@/components/DisplayMap";
import fetcher from "@/utils/fetcher";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListItem,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import useSWR from "swr";

const Info = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { data, error } = useSWR(
    ["/api/farm", process.browser ? localStorage.getItem("token") : null, ,],
    fetcher
  );

  // First fetch usually returns undefined
  if (!data) {
    return (
      <Layout>
        <Box px={12} py={16}>
          <Skeleton height="20px" my="10px" w="40%" />
          <Skeleton height="20px" my="10px" />
          <Skeleton height="20px" my="10px" />
          <Skeleton height="20px" my="10px" w="55%" />
        </Box>
      </Layout>
    );
  }

  if (data && data.message === "Empty") {
    // No Farm Info yet
    return (
      <Layout>
        <FarmInfoModify />
      </Layout>
    );
  }

  if (isEdit) {
    return (
      <Layout>
        <FarmInfoModify isEdit={isEdit} setIsEdit={setIsEdit} data={data} />
      </Layout>
    );
  }

  return (
    <Layout>
      {data && <Content data={data} isEdit={isEdit} setIsEdit={setIsEdit} />}
    </Layout>
  );
};

const Content = ({
  data: {
    name,
    owner,
    images,
    address,
    area,
    phone,
    fax,
    email,
    website,
    coordinate,
    reject,
    isAuthenticated,
  },

  isEdit,
  setIsEdit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Heading color="gray.700">Thông Tin Cơ Sở Của Bạn</Heading>
        <Button
          background="linear-gradient(90deg, rgba(35,144,246,1) 0%, rgba(11,90,191,1) 100%)"
          color="#fff"
          textTransform="uppercase"
          onClick={() => setIsEdit(!isEdit)}
        >
          <Box as={AiFillEdit} mr="0.5rem" />
          <span>Chỉnh sửa thông tin</span>
        </Button>
      </Flex>

      <EnterpriseAuthentication
        isAuthenticated={isAuthenticated}
        reject={reject}
        onOpen={onOpen}
        onClose={onClose}
      />
      <EnterpriseAuthenticationModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      <Grid
        paddingTop={12}
        gridTemplateColumns="repeat(12,1fr)"
        gridColumnGap="4rem"
      >
        <List
          gridColumn={{ base: "span 12", xl: "span 5" }}
          spacing={2}
          px={16}
          py={12}
          boxShadow="0 4px 10px rgba(0,0,0,.1)"
          background="#fff"
          mb={{ base: "2rem", xl: "0" }}
        >
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              {name}
            </Text>
          </ListItem>
          <ListItem>
            <Image
              src={images[0]}
              height="10rem"
              width="15rem"
              objectFit="contain"
              borderRadius="3px"
              mt="2rem"
              mb="1rem"
            />
          </ListItem>

          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Họ và tên chủ cơ sở:{" "}
              <Box as="span" fontWeight="normal">
                {owner}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Loại tài khoản:{" "}
              <Box as="span" fontWeight="normal">
                Nông dân
              </Box>
            </Text>
          </ListItem>

          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Diện tích trang trại:{" "}
              <Box as="span" fontWeight="normal">
                {area}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Địa chỉ trang trại:{" "}
              <Box as="span" fontWeight="normal">
                {address}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              SĐT liên hệ:{" "}
              <Box as="span" fontWeight="normal">
                {phone}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Fax:{" "}
              <Box as="span" fontWeight="normal">
                {fax}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Website:{" "}
              <Box as="span" fontWeight="normal">
                {website}
              </Box>
            </Text>
          </ListItem>
          <ListItem>
            <Text fontSize="md" fontWeight="bold">
              Email:{" "}
              <Box as="span" fontWeight="normal">
                {email}
              </Box>
            </Text>
          </ListItem>
        </List>
        <Box height="100%" gridColumn={{ base: "span 12", xl: "span 7" }}>
          <DisplayMap data={[{ coordinate, type: "house", name, address }]} />
        </Box>
      </Grid>
    </Box>
  );
};

const EnterpriseAuthentication = ({ isAuthenticated, onOpen, reject }) => {
  if (isAuthenticated === "") {
    return (
      <Alert status="error" mt="2rem" w="max-content" fontSize="1rem">
        <AlertIcon />
        Chưa chứng thực doanh nghiệp.{" "}
        <Box
          as="span"
          ml="3px"
          textDecoration="underline"
          cursor="pointer"
          onClick={onOpen}
        >
          {" "}
          Chứng thực để sử dụng các tính năng.
        </Box>
      </Alert>
    );
  } else if (isAuthenticated === "pending") {
    return (
      <Alert status="warning" mt="2rem" w="max-content" fontSize="1rem">
        <AlertIcon />
        Đang chờ xác thực doanh nghiệp
      </Alert>
    );
  } else if (isAuthenticated === "false") {
    return (
      <Alert status="error" mt="2rem" w="max-content" fontSize="1rem">
        <AlertIcon />
        <Box>
          <Box>Không được duyệt chứng thực. </Box>
          <Box>
            Lý do:{" "}
            <Box as="span" fontWeight="bold">
              {reject.message}({reject.createdAt})
            </Box>
          </Box>
          <Box
            cursor="pointer"
            textDecoration="underline"
            as="span"
            onClick={onOpen}
          >
            Chứng thực lại
          </Box>{" "}
        </Box>
      </Alert>
    );
  } else {
    return (
      <Alert status="success" mt="2rem" w="max-content" fontSize="1rem">
        <AlertIcon />
        Đã chứng thực doanh nghiệp
        <a
          style={{ marginLeft: "5px", textDecoration: "underline" }}
          href="/farm/authentication"
        >
          Xem chứng thực
        </a>
      </Alert>
    );
  }
};

export default Info;
