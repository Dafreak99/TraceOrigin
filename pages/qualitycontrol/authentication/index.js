import Layout from "@/components/dashboard/Layout";
import { Table, Td, Th, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import { Alert, AlertIcon, Box, Button, Heading, Text } from "@chakra-ui/react";
import useSWR from "swr";

const DashBoard = () => {
  const { data } = useSWR(
    [
      "/api/enterpriseauthentication",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  return (
    <Layout>
      <Box>
        <Heading mb={5}>Danh sách doanh nghiệp chờ duyệt xác thực</Heading>

        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>#</Th>
                <Th>Tên cơ sở</Th>
                <Th>SĐT</Th>
                <Th>Thêm vào bởi</Th>

                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {data.map(({ name, phone, createdBy, _id }, i) => (
                <Tr cursor="pointer">
                  <Td>{i + 1}</Td>
                  <Td>{name}</Td>
                  <Td>{phone}</Td>
                  <Td>{createdBy}</Td>
                  <Td>
                    <a href={`./authentication/${_id}`}>
                      <Button>Chi tiết</Button>
                    </a>
                  </Td>
                </Tr>
              ))}
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Tất cả đều đã được phê duyệt</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default DashBoard;
