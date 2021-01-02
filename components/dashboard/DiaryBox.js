import { Box, Flex, Text } from "@chakra-ui/core";
import { useState } from "react";
import FeedingDiaryModal from "@/components/dashboard/FeedingDiaryModal";

const DiaryBox = ({ bg, color, icon, modal }) => {
  const modalRender = () => {
    if (modal === "feeding") {
      return <FeedingDiaryModal visible={visible} setVisible={setVisible} />;
    }
  };
  return (
    <Box className="diary-boxx" onClick={() => setVisible(true)}>
      {/* <Modal visible={visible} setVisible={setVisible} /> */}
      {modalRender()}
      <Flex
        height="60px"
        width="60px"
        borderRadius="15px"
        justify="center"
        align="center"
        backgroundColor={bg}
        margin="0 auto"
      >
        <Box as={icon} height="32px" width="32px" color={color} />
      </Flex>
      <Text fontWeight="bold" fontSize="xl" mt="2rem">
        Nhật ký cho ăn
      </Text>
    </Box>
  );
};

export default DiaryBox;
