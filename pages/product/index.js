import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import NavbarDrawer from "@/components/NavbarDrawer";
import { Box } from "@chakra-ui/react";
import Products from "@/components/Products";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Footer from "@/components/Footer";

const Product = () => {
  // const { data } = useSWR("/api/product/finish", fetcher);
  const PUBLIC_KEY = "2xYEg5H4Ub65P8gaw7bqRUqY9oc7hK8mp4tCacudLiFS";

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      let outputs = await (
        await fetch(
          `https://test.ipdb.io/api/v1/outputs?public_key=${PUBLIC_KEY}`
        )
      ).json();

      let data = [];
      for (let output of outputs) {
        let a = await (
          await fetch(
            `https://test.ipdb.io/api/v1/transactions/${output.transaction_id}`
          )
        ).json();

        data.push({
          _id: a.asset.data._id,
          images: a.asset.data.images,
          name: a.asset.data.name,
        });
      }
      setData(data);
    }
    getData();
  }, []);

  console.log(data);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Navbar showDrawer={showDrawer} />
      <NavbarDrawer visible={visible} onClose={onClose} />
      <Box py="5rem">
        <Products data={data} />
      </Box>
      <Footer />
    </>
  );
};

export default Product;
