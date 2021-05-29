import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import QrcodeDecoder from "qrcode-decoder";
import { useRef } from "react";

const UploadQR = ({ onSearch }) => {
  const inputRef = useRef();
  const qr = new QrcodeDecoder();

  const onUpload = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = await qr.decodeFromImage(event.target.result);
        onSearch(result.data);
      };

      reader.readAsDataURL(files[0]);
    }

    inputRef.current.value = null;
  };
  return (
    <Box>
      <Input
        ref={inputRef}
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
