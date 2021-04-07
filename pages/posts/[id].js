import { Badge, Box, Flex, Heading, Image } from "@chakra-ui/core";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import { useEffect, useState } from "react";
import NavbarDrawer from "@/components/NavbarDrawer";

import parse from "html-react-parser";
import BackButton from "@/components/dashboard/BackButton";
import { Skeleton } from "antd";
import Link from "next/link";

const DetailPost = ({ data }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
        <Box className="container" fontSize="1rem">
          {data ? (
            <>
              {" "}
              <Flex align="center" marginBottom="2rem">
                <BackButton />
                <Heading>
                  {data.name}{" "}
                  <Badge variantColor="teal" fontSize="1.5rem" cursor="pointer">
                    <Link href={`/type/${data.type}`}>
                      <a>{data.type}</a>
                    </Link>
                  </Badge>
                </Heading>
              </Flex>
              <Image src={data.image} borderRadius="10px" marginBottom="2rem" />
              {parse(data.description)}
            </>
          ) : (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],

    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://traceorigin.vercel.app/api/post/${params.id}`
  );

  const data = await res.json();

  return {
    props: { data },
  };
}

export default DetailPost;
