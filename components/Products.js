import { Grid, Heading } from "@chakra-ui/core";
import Product from "./Product";

const Products = () => {
  return (
    <>
      <Heading textAlign="center" textTransform="uppercase" my={16}>
        Sản phẩm thủy sản
      </Heading>

      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        className="container"
        columnGap={4}
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
