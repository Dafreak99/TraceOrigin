import { Box } from "@chakra-ui/core";
import Layout from "../components/dashboard/Layout";

const Index = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <Box px={16} py={12}>
        hello world
      </Box>
    </Layout>
  );
};

export async function getStaticPaths() {
  // http://locahost:3000/api/food
  let res = await fetch("https://traceorigin.vercel.app/api/food", {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    },
  });
  let data = await res.json();

  let paths = data.map((food) => ({ params: { id: food._id, data: food } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let res = await fetch(
    `https://traceorigin.vercel.app/api/food/${params.id}`,
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
      },
    }
  );

  let data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Index;
