import { useEffect } from "react";
import Link from "next/link";

import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { Table, Th, Tr, Td } from "../components/Table";

const DashBoard = () => {
  const { data, error } = useSWR("/api/products", fetcher);

  console.log(data);

  return (
    <Table>
      <Tr>
        <Th>Product Name</Th>
        <Th>Product Price</Th>
        <Th>Start Date</Th>
        <Th>Unit</Th>
        <Th>{""}</Th>
      </Tr>
      {data &&
        data.products.map(
          ({ productName, productPrice, startDate, unit, id }) => (
            <Tr>
              <Td>{productName}</Td>
              <Td>{productPrice}</Td>
              <Td>{startDate}</Td>
              <Td>{unit}</Td>
              <Td>
                <Link href="/products/[id]" as={`/products/${id}`}>
                  <a>View Product {id}</a>
                </Link>
              </Td>
            </Tr>
          )
        )}
    </Table>
  );
};

export default DashBoard;
