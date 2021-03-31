import { Grid, Heading, Image } from "@chakra-ui/core";
import Product from "./Product";
import SectionPadding from "./SectionPadding";

const Products = ({ data }) => {
  return (
    <SectionPadding>
      <Heading
        className="heading"
        marginBottom={16}
        fontSize={{ base: "xl", xl: "4xl" }}
        fontFamily="Nunito, sans-serif"
        color="#373535"
      >
        Sản Phẩm Thủy Sản
      </Heading>
      <Image src="/blob/2.svg" className="blob product" />

      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        className="container"
        columnGap={{ base: 0, xl: 16 }}
        rowGap={16}
      >
        {data && data.length > 0 && (
          <>
            {data.map((each) => (
              <Product {...each} />
            ))}
          </>
        )}
      </Grid>
    </SectionPadding>
  );
};

export default Products;
