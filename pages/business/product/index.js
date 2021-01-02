import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  FormLabel,
  Heading,
  Image,
  Input,
  ModalFooter,
  Spinner,
} from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import useSWR from "swr";
import { Controller, useForm } from "react-hook-form";

import fetcher from "@/utils/fetcher";
import { Table, Td, Th, Tr } from "@/components/Table";
import { FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import Modal from "antd/lib/modal/Modal";
import FormControl from "@/components/dashboard/FormControl";
import { useState } from "react";
import { Divider, Select } from "antd";

const Product = () => {
  const router = useRouter();

  const { data, error } = useSWR("/api/business", fetcher);
  const [productId, setProductId] = useState(null);

  const { data: processingFacilties } = useSWR(
    [
      "/api/processingfacility",
      // BUSINESS ACCOUNT USER TOKEN
      process.browser ? localStorage.getItem("token") : null,

      // "eyJhbGciOiJIUzI1NiJ9.NWZkYjFiOWM0MjRkYjUwM2E0OTdjN2Iy.5rpAKpQJ35fR9F_bWwW4vZQc-rRPPqHO_ABVG6Hk9Ao",
    ],
    fetcher
  );

  const [visible, setVisible] = useState(false);
  const { handleSubmit, register, errors, control, reset } = useForm();
  const [isSave, setIsSave] = useState(false);

  const handleProcess = (id) => {
    setProductId(id);

    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    setIsSave(true);
    try {
      let res = await fetch(`/api/product/${productId}`, {
        method: "PUT",
        body: values,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            // REPLACE TOKEN
            process.browser ? localStorage.getItem("token") : null,

          // "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
        body: JSON.stringify(values),
      });
      let data = await res.json();
    } catch (error) {
      console.log(error.message);
    }
    setIsSave(false);

    router.reload();
  };

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <Heading mt={10} mb={5}>
          Sản phẩm chờ duyệt
        </Heading>

        {data && data?.product && data.product.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày thu hoạch</Th>
              <Th>Tên sản phẩm</Th>
              <Th>Hình ảnh</Th>
              <Th>Trọng lượng</Th>
              <Th>Đơn vị</Th>
              <Th>Trạng thái</Th>
              <Th>{""}</Th>
            </Tr>
            {data.product.map(
              (
                { donvi, ngayThuHoach, tenSanPham, trongLuong, hinhAnh, _id },
                i
              ) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./product/${_id}`)}
                >
                  <Td>{format(new Date(ngayThuHoach), "dd/MM/yyyy")}</Td>

                  <Td>{tenSanPham}</Td>
                  <Td>
                    <Image src={hinhAnh[0]} height="5rem" />
                  </Td>
                  <Td>{trongLuong}</Td>
                  <Td>{donvi}</Td>
                  <Td>
                    <Badge p="5px 10px" borderRadius="3px">
                      Pending
                    </Badge>
                  </Td>

                  <Td
                    borderLeft="1px solid #e8eef3"
                    px={8}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProcess(_id);
                    }}
                    color="#5adba5"
                  >
                    <Box as={AiFillCheckCircle} size="32px"></Box>
                  </Td>
                </Tr>
              )
            )}

            {/* Modal */}

            <Modal
              visible={visible}
              title="Chọn cơ sở chế biến"
              onCancel={handleCancel}
              footer={null}
            >
              {/* Modal Body */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <FormLabel>Cơ sở chế biến</FormLabel>
                  {processingFacilties && processingFacilties.length > 0 && (
                    <Controller
                      name="processingFacility"
                      control={control}
                      defaultValue={processingFacilties[0]._id}
                      rules={{ required: true }}
                      render={({ onChange }) => (
                        <Select
                          onChange={onChange}
                          style={{ width: "100%" }}
                          defaultValue={processingFacilties[0].tenCoSoCheBien}
                        >
                          {processingFacilties.map((facility) => (
                            <Option value={facility._id}>
                              {facility.tenCoSoCheBien}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  )}
                </FormControl>

                <ModalFooter>
                  <Button variantColor="blue" mr={3} onClick={handleCancel}>
                    Đóng
                  </Button>
                  {isSave ? (
                    <Button backgroundColor="gray.400" color="#fff">
                      <Spinner mr={4} /> Đang lưu
                    </Button>
                  ) : (
                    <Button variant="ghost" type="submit">
                      Lưu
                    </Button>
                  )}
                </ModalFooter>
              </form>
            </Modal>
          </Table>
        ) : (
          <Alert status="success" fontSize="md" w="30rem">
            <AlertIcon />
            Tất cả sản phẩm đều đã được duyệt
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Product;
