import { Grid, Heading } from "@chakra-ui/core";
import Product from "./Product";

const Products = () => {
  return (
    <>
      <Heading textAlign="center" textTransform="uppercase" mb={16}>
        Sản phẩm thủy sản
      </Heading>

      <Grid
        templateColumns={["repeat(3, 1fr)"]}
        className="container"
        rowGap={16}
      >
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Grid>
    </>
  );
};

export default Products;
