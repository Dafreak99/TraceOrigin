import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

const BackButton = (props) => {
  const router = useRouter();

  return (
    <Flex
      justify="center"
      align="center"
      height="50px"
      width="50px"
      background="#c9e3fe45"
      borderRadius="50%"
      mr={8}
      cursor="pointer"
      onClick={() => router.back()}
      {...props}
    >
      <Box height="32px" width="32px" as={BiArrowBack} color="#4386e8" />
    </Flex>
  );
};

export default BackButton;
