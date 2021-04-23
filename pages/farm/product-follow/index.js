import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Alert,
  AlertIcon,
  Badge,
  Text,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";

import QRCode from "qrcode.react";
import Link from "next/link";

const Product = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const { data, error } = useSWR(
    ["/api/product", process.browser ? localStorage.getItem("token") : null],
    fetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const onDelete = async () => {
    try {
      let res = await fetch(`/api/food/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
      });

      mutate(
        ["/api/food", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          let data = cachedData.filter((each) => each._id !== id);
          return data;
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setIsOpen(false);
  };

  if (loading) {
    return (
      <Layout>
        <Box position="relative">
          <Heading mb={5}>Danh sách sản phẩm đang theo dõi</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  const productStatus = (status) => {
    if (status === "false") {
      return (
        <Badge
          ml="1"
          fontSize="0.8em"
          background="#f8c3c3f0"
          color="#794444"
          borderRadius="10px"
          padding="10px"
        >
          No
        </Badge>
      );
    } else if (status === "true") {
      return (
        <Badge
          ml="1"
          fontSize="0.8em"
          background="#20f3b8"
          color="#fff"
          borderRadius="10px"
          padding="10px"
        >
          Yes
        </Badge>
      );
    } else if (status === "pending") {
      return (
        <Badge
          ml="1"
          fontSize="0.8em"
          background="#d1d8e8"
          color="#646770"
          borderRadius="10px"
          padding="10px"
        >
          Pending
        </Badge>
      );
    }
  };

  const reRegister = async (id) => {
    try {
      let res = await fetch(`/api/product/register/reregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <Box position="relative">
        <Heading mb={5}>Danh sách sản phẩm đang theo dõi</Heading>
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Tên sản phẩm</Th>
                <Th>Nuôi tại ao</Th>
                <Th>Ngày thả giống</Th>
                <Th>Được duyệt đăng ký</Th>
                <Th>Mã QR</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.map(
                  (
                    {
                      name,
                      pond: {
                        name: pondName,
                        seed: { stockingDate },
                        _id: pondId,
                      },
                      isHarvested,
                      isRegistered,
                      qrCode,
                      _id,
                    },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Link href={`./food/${_id}`}>
                        <Tr>
                          <Td>{name}</Td>
                          <Td>{pondName}</Td>
                          <Td>{stockingDate}</Td>
                          <Td>{productStatus(isRegistered.status)}</Td>
                          <Td>{qrCode ? qrCode : "Chưa cấp"}</Td>
                          {qrCode ? (
                            <Td>
                              <QRCode
                                size={100}
                                value={
                                  "http://traceorigin.vercel.app/product/" +
                                  qrCode
                                }
                              />
                            </Td>
                          ) : (
                            <Td></Td>
                          )}

                          <Td
                            px={8}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {isRegistered.status === "false" ? (
                              <Button onClick={() => reRegister(_id)}>
                                Đăng ký lại
                              </Button>
                            ) : isRegistered.status === "true" ? (
                              <Button>
                                <Link href={`/farm/harvest/${_id}`}>
                                  <a>
                                    {isHarvested?.status === "false"
                                      ? "Thu hoạch lại"
                                      : "Thu hoạch"}
                                  </a>
                                </Link>
                              </Button>
                            ) : null}
                          </Td>

                          <Td
                            borderLeft="1px solid #e8eef3"
                            px={8}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(true);
                              setId(_id);
                            }}
                          >
                            <Box as={FaTrash}></Box>
                          </Td>
                        </Tr>
                      </Link>
                    </CSSTransition>
                  )
                )}
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay />
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Xóa
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Bạn có chắc rằng sẽ xóa sản phẩm này ?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Hủy bỏ
                      </Button>
                      <Button colorScheme="red" onClick={onDelete} ml={3}>
                        Xóa
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TransitionGroup>
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Hiện không có sản phẩm nào</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Product;
