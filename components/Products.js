import { Grid, Heading } from "@chakra-ui/core";
import Product from "./Product";

const Products = () => {
  return (
    <>
      <Heading className="heading" marginBottom={16}>
        Sản phẩm thủy sản
      </Heading>

      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        className="container"
        columnGap={16}
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
