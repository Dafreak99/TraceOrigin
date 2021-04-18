import { useState } from "react";
import { FormLabel, Input, Image, Flex, Box } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

import styles from "../../styles/UploadPreview.module.css";

/**
 * To use this component please pass in [files, setFiles] [fileUrls, setFileUrls]
 */

const UploadPreview = ({ files, setFiles, fileUrls, setFileUrls }) => {
  const onUpload = (e) => {
    let srcs = [];
    let filesBlob = [];

    for (let i = 0; i < e.target.files.length; i++) {
      // Create blob to display image inside browser
      filesBlob.push(URL.createObjectURL(e.target.files[i]));
      // This is the actuacl File Type
      srcs.push(e.target.files[i]);
    }

    setFiles([...files, ...srcs]);
    setFileUrls([...fileUrls, ...filesBlob]);
  };

  const onDeselectImage = (e) => {
    let index = parseInt(e.target.getAttribute("data-index"));

    setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
    setFileUrls([...fileUrls.slice(0, index), ...fileUrls.slice(index + 1)]);
  };

  return (
    <Flex flexWrap="wrap">
      <FormLabel
        htmlFor="image"
        h="100px"
        w="100px"
        backgroundColor="gray.200"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="0"
        borderRadius="3px"
      >
        <AiOutlinePlus fontSize="40px" />
      </FormLabel>
      <Input
        type="file"
        id="image"
        name="image"
        display="none"
        onChange={onUpload}
        multiple
        accept="image/*"
      />
      {fileUrls.length > 0 &&
        fileUrls.map((url, i) => (
          <Box className={styles.uploadPreview}>
            <Box className={styles.overlay} />
            <Image
              src={url}
              id="ok"
              h="100px"
              w="100px"
              objectFit="contain"
              border="3px solid #ebedf1"
              borderRadius="3px"
              marginRight="1rem"
            />
            <Box
              as={FiTrash}
              color="#fff"
              data-index={i}
              className={styles.close}
              onClick={onDeselectImage}
            />
          </Box>
        ))}
    </Flex>
  );
};

export default UploadPreview;
