import { getAllProducts, getProductsById } from "../../../lib/db-admin";
import { Code, Stack, Heading, Image, Box } from "@chakra-ui/core";

const ProductPage = ({ product, notes }) => {
  return (
    <>
      <Box maxW="80%" margin="0 auto" marginTop={8}>
        <Stack>
          <Code children={product.tensanpham} />
          <Code variantColor="red" children={product.giathanh} />
          <Code variantColor="yellow" children={product.ngaynuoitrong} />
          <Code variantColor="teal" children={product.khoiluong} />
          <Image
            src={product.hinhanh}
            alt="Segun Adebayo"
            size="100px"
            objectFit="cover"
          />
        </Stack>
        <Heading>Cơ sở nuôi trồng: </Heading>
      </Box>

      {/* <Stack>
        {notes.map((note) => (
          <Code children={note.content + "-" + note.date} />
        ))}
      </Stack> */}
    </>
  );
};

export async function getStaticProps({ params }) {
  const { product, notes } = await getProductsById(params.id);

  return {
    props: {
      product,
      notes,
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
