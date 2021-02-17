import { Grid, Heading } from "@chakra-ui/core";
import Product from "./Product";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const Products = ({ data }) => {
  return (
    <>
      <Heading
        className="heading"
        marginBottom={16}
        fontSize={{ base: "xl", xl: "4xl" }}
        fontFamily="Inter, sans-serif"
        color="#373535"
      >
        Sản Phẩm Thủy Sản
      </Heading>

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
    </>
  );
};

export default Products;
