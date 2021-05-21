import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";

const UploadQR = () => {
  const onUpload = (e) => {
    console.dir(e.target);
  };
  return (
    <Box>
      <Input
        type="file"
        name="file"
        id="qrUpload"
        display="none"
        onChange={onUpload}
      />

      <Box
        as="label"
        htmlFor="qrUpload"
        width="200px"
        height="200px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        background="#006aff"
        color="#fff"
        transition="350ms all"
        _hover={{ background: "#4384df" }}
        cursor="pointer"
        borderRadius="20px"
      >
        <Image src="qr-code.svg" width="50px" height="50px" />
        <Text fontWeight="bold" mt="1rem">
          Tải hình ảnh QR lên
        </Text>
      </Box>
    </Box>
  );
};

export default UploadQR;
