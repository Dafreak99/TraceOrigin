import { useRouter } from "next/router";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import moment from "moment";

import { getAllProducts, getProductsById } from "../../../lib/db-admin";
import { createNote } from "../../../lib/db";

const EditProduct = ({
  product: { productName, productPrice, unit, startDate },
  id,
}) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    const newNote = {
      content: values.note,
      productId: id,
      date: moment().format("L"),
    };

    createNote(newNote);
  };

  return (
    <Flex
      height="100vh"
      width="100vw"
      backgroundColor="gray.800"
      justify="center"
      align="center"
    >
      <Box
        as="form"
        width="800px"
        background="#fff"
        p={8}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading fontWeight="bold" textAlign="center" mb={8} color="gray.600">
          Edit Product
        </Heading>
        <FormControl mb={4}>
          <FormLabel htmlFor="product-name">Product Name</FormLabel>
          <Input
            type="text"
            id="product-name"
            value={productName}
            name="productName"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="product-price">Product Price</FormLabel>
          <Input
            type="text"
            id="product-price"
            name="productPrice"
            value={productPrice}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="start-date">Start Date</FormLabel>
          <Input
            type="text"
            id="start-date"
            name="startDate"
            value={startDate}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="unit">Unit</FormLabel>
          <Input type="text" id="unit" name="unit" value={unit} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="unit">Note</FormLabel>
          <Input
            type="text"
            id="note"
            name="note"
            ref={register({
              required: "Required",
            })}
          />
        </FormControl>
        <Button type="submit">Edit</Button>
      </Box>
    </Flex>
  );
};

export async function getStaticProps({ params }) {
  const { product } = await getProductsById(params.id);

  return {
    props: {
      product,
      id: params.id,
    },
  };
}

export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products.map((product) => {
    return {
      params: {
        id: product.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default EditProduct;
