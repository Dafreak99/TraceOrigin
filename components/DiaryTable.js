import { Box, Heading, Flex, Grid, Text } from "@chakra-ui/react";
import GreenDot from "./GreenDot";
import { Table } from "antd";
import {
  dailyColumns,
  feedingColumns,
  medicineColumns,
  pondEnvColumns,
  replaceWaterColumns,
} from "@/utils/table";

const DiaryTable = ({
  data: { feeding, usingMedicine, pondEnvironment, dailyNote, replaceWater },
}) => {
  const dairies = [
    { title: "Cho ăn", data: feeding, columns: feedingColumns },
    { title: "Sử dụng thuốc", data: usingMedicine, columns: medicineColumns },

    { title: "Môi trường ao", data: pondEnvironment, columns: pondEnvColumns },
    {
      title: "Thay nước",
      data: replaceWater,
      columns: replaceWaterColumns,
    },
    {
      title: "Ghi chép hằng ngày",
      data: dailyNote,
      columns: dailyColumns,
    },
  ];

  return (
    <Box
      bg="#fff"
      borderRadius="10px"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "30px", md: "50px" }}
      boxShadow="0 2px 4px rgb(57 70 106 / 10%)"
    >
      <Flex mb={6}>
        <GreenDot />
        <Heading fontWeight="bold" fontSize="20px">
          Nhật ký nuôi trồng
        </Heading>
      </Flex>
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        gridGap={{ base: 0, lg: "3rem" }}
      >
        {dairies.map(({ title, data, columns }, i) => (
          <Box
            gridColumn={{
              base: "span 2",
              lg: i === 3 || i === 4 ? "span 1" : "span 2",
            }}
            mb="2rem"
          >
            <Heading fontSize="md" mb="10px">
              {i + 1 + ` .`} {title}
            </Heading>
            {data.length > 0 ? (
              <Table
                bordered
                pagination={false}
                columns={columns}
                dataSource={data}
                scroll={{ x: "max-content" }}
              />
            ) : (
              <Text>Không có ghi nhận</Text>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default DiaryTable;
