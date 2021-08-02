import { Table, Td, Th, Tr } from "@/components/Table";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import QRCode from "qrcode.react";
import { useState } from "react";

const Product = ({ product }) => {
  const [isOpen, setIsOpen] = useState();

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const { pond, isRegistered, qrCode, _id, isHarvested } = product;

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

  const onReRegister = async (id) => {
    try {
      await fetch(`/api/product/register/reregister`, {
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

  return (
    <Box>
      <Table mb="2rem">
        <Tr>
          <Th>Được duyệt {isHarvested ? "thu hoạch" : "đăng ký"}</Th>
          <Th>
            {" "}
            {isRegistered.status === "false" || isHarvested?.status
              ? "Lí do"
              : "Mã QR"}
          </Th>
          <Th>{""}</Th>
        </Tr>
        <Tr>
          <Td>
            {isHarvested
              ? productStatus(isHarvested.status)
              : productStatus(isRegistered.status)}
          </Td>
          {isRegistered.status === "false" ? (
            <Td>{isRegistered.reject.message}</Td>
          ) : isHarvested?.status === "false" ? (
            <Td>{isHarvested.reject.message}</Td>
          ) : (
            <Td>
              <QRCode
                size={50}
                value={"http://traceorigin.vercel.app/product/" + qrCode}
              />
            </Td>
          )}

          {/* Show Register/Re-register/Harvest Button */}
          <Td>
            {isRegistered.status === "true" ? (
              <Button>
                <Link href={`/farm/harvest/${_id}`}>
                  <a>Thu hoạch</a>
                </Link>
              </Button>
            ) : isRegistered.status === "false" ? (
              <Button onClick={() => onReRegister(_id)}>Đăng ký lại</Button>
            ) : null}
          </Td>
        </Tr>

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
      </Table>
    </Box>
  );
};

export default Product;
