import {
  Box,
  Text,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

import Layout from "@/components/dashboard/Layout";
import FeedingChart from "@/components/dashboard/FeedingChart";
import { Select } from "antd";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";

const { Option } = Select;

const FeedingChartPage = () => {
  const [pondId, setPondId] = useState(null);

  const { data, error } = useSWR(
    [`/api/pond`, process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setPondId(data.ponds[0]._id);
    }
  }, [data]);

  if (!data) {
    return (
      <Layout>
        <Box>
          <Heading mb={8}>Nhật ký cho ăn</Heading>
          <Skeleton height="20px" width="200px" />
        </Box>
        <Stack mt={8}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box>
        <Heading mb={8}>Nhật ký cho ăn</Heading>
        <Select
          style={{ width: "200px" }}
          size="large"
          defaultValue={data.ponds[0].name}
          onChange={(e) => console.log(e)}
        >
          {data.ponds.map(({ _id, name }) => (
            <Option value={_id}>{name}</Option>
          ))}
        </Select>
      </Box>
      {pondId && <FeedingChart pondId={pondId} />}
    </Layout>
  );
};

export default FeedingChartPage;
