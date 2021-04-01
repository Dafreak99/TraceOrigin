import React from "react";
import { Box, Skeleton } from "@chakra-ui/core";
import { Table, Tr, Th, Td } from "../Table";

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
);

const SkeletonTable = ({ tableHeading }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Ngày nhập</Th>
          <Th>Tên thức ăn</Th>
          <Th>Hình ảnh</Th>
          <Th>Số lượng(kg)</Th>
          <Th>Ngày sản xuất</Th>
          <Th>Hạn sử dụng</Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width="50px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="50px" />
      </tbody>
    </Table>
  );
};

export default SkeletonTable;
