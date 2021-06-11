import { listOutputs } from "@/lib/bigchain";
import { Grid, Heading, Image } from "@chakra-ui/react";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import Product from "./Product";
import SectionPadding from "./SectionPadding";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      let data = await listOutputs();

      setData(data);
    }
    getData();
  }, []);

  return (
    <SectionPadding>
      <Heading
        className="heading"
        marginBottom={{ base: "10rem", sm: "4rem", lg: "6rem", xl: "8rem" }}
        fontSize={{ base: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
        fontFamily="Nunito, sans-serif"
        color="#373535"
      >
        Sản Phẩm Thủy Sản
      </Heading>
      <Image src="/blob/2.svg" className="blob product" />

      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        className="container"
        columnGap={{ base: 4, md: 8, lg: 12, xl: 16 }}
        rowGap={16}
      >
        {data?.length > 0 ? (
          <>
            {data.map((each) => (
              <Product {...each} />
            ))}
          </>
        ) : (
          <Skeleton active style={{ gridColumn: "span 12" }} />
        )}
      </Grid>
    </SectionPadding>
  );
};

export default Products;
