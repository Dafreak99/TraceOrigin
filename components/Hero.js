import { useRef, useEffect, useState } from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
          background="linear-gradient(90deg, rgba(35,144,246,1) 0%, rgba(11,90,191,1) 100%)"
          position="relative"
        >
          <Image src="./wave-haikei.svg" className="wave" />
          <Box
            className="container"
            display="flex !important"
            justifyContent={{ xl: "space-between", base: "center" }}
            alignItems="center"
            justify="center"
            height="100vh"
            position="relative"
            flexDir={{ base: "column", xl: "row" }}
          >
            <Flex justifyContent="center" flexDir="column" alignItems="center">
              <Heading
                color="#fff"
                mb={8}
                fontSize={{ base: "3xl", xl: "5xl" }}
                className={i === index ? "fadeIn" : "preFadeIn"}
                textAlign={{ sx: "center" }}
                fontFamily="Nunito, sans-serif"
              >
                {heading}
              </Heading>

              <Text
                className={i === index ? "fadeIn" : "preFadeIn"}
                fontSize={{ base: "xl", xl: "2xl" }}
                color="#f9fafa"
                fontWeight="normal"
                fontFamily="Nunito, sans-serif"
              >
                {text}
              </Text>
            </Flex>
            <Image
              mt={{ sx: "2rem", xl: 0 }}
              src={background}
              height={{ base: "10rem", lg: "15rem", xl: "30rem" }}
              className={i === index ? "fadeInLeft" : "preFadeInLeft"}
            />
          </Box>
        </Box>
      ))}
    </Slider>
  );
};

export default Hero;
