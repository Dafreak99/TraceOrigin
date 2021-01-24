import Layout from "@/components/dashboard/Layout";

import { Box, Alert, AlertIcon, Heading } from "@chakra-ui/core";

import { Table, Td, Th, Tr } from "@/components/Table";

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useRouter } from "next/router";

import { Popconfirm } from "antd";

import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";

const DashBoard = () => {
  const router = useRouter();

  const { data: products } = useSWR(
    [
      "/api/product/unapproved",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const onDelete = async (id) => {
    // try {
    //   let res = await fetch(`/api/food/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: process.browser ? localStorage.getItem("token") : null,
    //     },
    //   });
    //   mutate(
    //     ["/api/food", process.browser ? localStorage.getItem("token") : null],
    //     async (cachedData) => {
    //       let data = cachedData.filter((each) => each._id !== id);
    //       return data;
    //     },
    //     false
    //   );
    // } catch (error) {
    //   console.log(error.message);
    // }
    // setIsOpen(false);
  };

  const onApprove = async (id) => {
    // Send ID to change duyetDangKy -> true
    let res = await fetch(`/api/product/approved`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ id }),
    });

    mutate(
      [
        "/api/product/unapproved",
        process.browser ? localStorage.getItem("token") : null,
      ],
      async (cachedData) => {
        let data = cachedData.filter((each) => each._id !== id);

        return data;
      },
      false
    );
  };

  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mt={10} mb={5}>
          Sản phẩm chờ duyệt
        </Heading>

        {products && products.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Tên sản phẩm</Th>
                <Th>Nuôi tại ao</Th>
                <Th>Ngày thả giống</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {products.map(
                (
                  {
                    tenSanPham,
                    pond: {
                      tenAo,
                      seed: { ngayThaGiong },
                    },
                    duyetDangKy,
                    _id,
                  },
                  i
                ) => (
                  <Tr
                    backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                    cursor="pointer"
                    onClick={() =>
                      router.push(`./qualitycontrol/product-register/${_id}`)
                    }
                  >
                    <Td>{tenSanPham}</Td>
                    <Td>{tenAo}</Td>
                    <Td>{ngayThaGiong}</Td>

                    <Td
                      px={8}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Popconfirm
                        title="Bạn có chắc sẽ duyệt sản phẩm này？"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => onApprove(_id)}
                      >
                        <Box
                          as={AiFillCheckCircle}
                          size="32px"
                          color="#5adba5"
                        ></Box>
                      </Popconfirm>
                    </Td>
                    <Td
                      px={8}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      color="#f72f2f"
                    >
                      <Popconfirm
                        title="Bạn có chắc sẽ không duyệt sản phẩm này？"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => onDelete(_id)}
                      >
                        <Box as={AiFillCloseCircle} size="32px"></Box>
                      </Popconfirm>
                    </Td>
                  </Tr>
                )
              )}
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            Tất cả đã được phê duyệt
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default DashBoard;