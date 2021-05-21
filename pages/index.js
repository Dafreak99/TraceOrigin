import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import useSWR from "swr";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import NavbarDrawer from "@/components/NavbarDrawer";
import Footer from "@/components/Footer";
import fetcher from "@/utils/fetcher";
import Chatbot from "@/components/Chatbot";
import Articles from "@/components/Articles";
import Features from "@/components/Features";

const IndexPage = () => {
  // const { data } = useSWR("/api/product/finish", fetcher);

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

  const { data: posts } = useSWR("/api/post", fetcher);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Box position="relative">
        <Navbar showDrawer={showDrawer} float />
        <NavbarDrawer visible={visible} onClose={onClose} />
        <Hero />
      </Box>
      <Features />
      <Products data={data} />
      <Chatbot />
      <Articles data={posts} />
      <Footer />
    </>
  );
};

export default IndexPage;
