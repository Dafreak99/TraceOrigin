import { useState } from "react";
import { FormLabel, Input, Image, Flex, Box } from "@chakra-ui/core";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

import styles from "../styles/UploadPreview.module.css";

const UploadPreview = ({ filesSrc, setFilesSrc }) => {
  const [files, setFiles] = useState([]);

  const onUpload = (e) => {
    let filesBlob = [];
    let srcs = [];

    for (let i = 0; i < e.target.files.length; i++) {
      filesBlob.push(URL.createObjectURL(e.target.files[i]));
      srcs.push(e.target.files[i]);
    }

    setFiles([...files, ...filesBlob]);
    setFilesSrc([...filesSrc, ...srcs]);
  };

  const onDeselectImage = (e) => {
    let index = e.target.getAttribute("data-index");

    if (index) {
      setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
      setFilesSrc([...filesSrc.slice(0, index), ...filesSrc.slice(index + 1)]);
    }
  };

  return (
    <Flex>
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
        marginRight="1rem"
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
      {files.length > 0 &&
        files.map((file, i) => (
          <div className={styles.uploadPreview}>
            <div className={styles.overlay} />
            <Image
              src={file}
              id="ok"
              h="100px"
              w="100px"
              objectFit="contain"
              border="3px solid #f7f6f6"
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
          </div>
        ))}
    </Flex>
  );
};

export default UploadPreview;
