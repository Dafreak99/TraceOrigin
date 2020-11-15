import { useRef, useEffect, useState } from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/core";
import Slider from "react-slick";
import gsap from "gsap";

const Hero = () => {
  let [index, setIndex] = useState(0);

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current, next) => {
      setIndex(current);
    },
  };

  let headingRef = useRef(null);

  const data = [
    {
      heading: "Truy xuất nguồn gốc thủy sản",
      text: "Đảm bảo bữa ăn an toàn cho gia đình bạn",
      background: "/Eating healthy food-amico.svg",
      // background: "/photo-1517115358639-5720b8e02219-removebg-preview.png",
    },
    {
      heading: "Truy xuất nguồn gốc thủy sản",
      text: "Đảm bảo tính minh mạch và độ an toàn trong từng món ăn",
      background: "/Slider1.svg",
    },
  ];

  return (
    <Slider {...settings}>
      {data.map(({ heading, text, background }, i) => (
        <Box
          key={i}
          display="flex !important"
          justifyContent={{ xl: "space-between", base: "center" }}
          alignItems="center"
          height="100vh"
          paddingX={{ base: "2rem", xl: "8rem" }}
          background="#0089ff"
          justify="center"
          position="relative"
          flexDir={{ base: "column", xl: "row" }}
        >
          <Flex justifyContent="center" flexDir="column" alignItems="center">
            <Heading
              color="#fff"
              mb={8}
              fontSize={{ base: "3xl", xl: "6xl" }}
              className={i === index ? "fadeIn" : "preFadeIn"}
              textAlign={{ sx: "center" }}
            >
              {heading}
            </Heading>

            <Text
              className={i === index ? "fadeIn" : "preFadeIn"}
              fontSize={{ base: "xl", xl: "3xl" }}
              color="#f9fafa"
              fontWeight="normal"
            >
              {text}
            </Text>
          </Flex>
          <Image
            mt={{ sx: "2rem", xl: 0 }}
            src={background}
            height={["10rem", "15rem", "20rem", "30rem"]}
            className={i === index ? "fadeInLeft" : "preFadeInLeft"}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default Hero;
