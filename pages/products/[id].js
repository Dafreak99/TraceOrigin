import { getAllProducts, getProductsById } from "../../lib/db-admin";
import { Code, Stack } from "@chakra-ui/core";

const ProductPage = ({ product }) => {
  console.log(product);
  return (
    <Stack>
      <Code children={product.productName} />
      <Code variantColor="red" children={product.productPrice} />
      <Code variantColor="yellow" children={product.startDate} />
    </Stack>
  );
};

export async function getStaticProps({ params }) {
  const product = await getProductsById(params.id);

  return {
    props: {
      product,
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

export default ProductPage;
