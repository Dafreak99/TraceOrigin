import { useState } from "react";
import Navbar from "@/components/Navbar";
import NavbarDrawer from "@/components/NavbarDrawer";
import Footer from "@/components/Footer";
import Articles from "@/components/Articles";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const Post = () => {
  const [visible, setVisible] = useState(false);
  const { data } = useSWR("/api/post", fetcher);

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
      <Articles data={data} />
      <Footer />
    </>
  );
};

export default Post;
