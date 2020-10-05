import { useRef, useEffect, useState } from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/core";
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
      background: "/photo-1517115358639-5720b8e02219-removebg-preview.png",
    },
    {
      heading: "Truy xuất nguồn gốc thủy sản",
      text: "Đảm bảo tính minh mạch và độ an toàn trong từng món ăn",
      background: "/pexels-photo-248444-removebg-preview.png",
    },
  ];

  return (
    <Slider {...settings}>
      {data.map(({ heading, text, background }, i) => (
        <Box
          key={i}
          display="flex !important"
          flexDir="column"
          justifyContent="center"
          height="100vh"
          paddingX={32}
          background="#0089ff"
          justify="center"
          position="relative"
        >
          <Heading
            color="#fff"
            mb={8}
            fontSize="4rem"
            className={i === index ? "fadeIn" : "preFadeIn"}
          >
            {heading}
          </Heading>

          <Text
            className={i === index ? "fadeIn" : "preFadeIn"}
            fontSize="2rem"
            color="#f9fafa"
            fontWeight="normal"
          >
            {text}
          </Text>
          <Image
            src={background}
            position="absolute"
            top="30%"
            right="10%"
            className={i === index ? "fadeInLeft" : "preFadeInLeft"}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default Hero;
