import fetcher from "@/utils/fetcher";
import { Alert, AlertIcon, Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const FeedingChart = ({ pondId }) => {
  const { data: feedingDiaries, error } = useSWR(
    [
      `/api/feedingdiary/pond/${pondId}`,
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  console.log("feeding", feedingDiaries);

  const values = [
    {
      _id: "5f9421434959fa23c00d7830",
      note: "Test cho an",
      weight: "12",
      ao: "5f87113aa0e6d61860af5bcc",
      food: "5f8cfefe03ac3f2580ee049f",
      createdDate: "8/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424484959fa23c00d7831",
      ao: "5f87113aa0e6d61860af5bcc",
      food: "5f8cff9003ac3f2580ee04a0",
      weight: "25",
      note: "",
      createdDate: "9/10/2020",
      __v: 0,
    },
  ];

  let labels = values.map((each) => each.createdDate);
  let data = values.map((each) => +each.weight);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    var ctx = document.getElementById("myChart");
    // var myChart = new Chart(ctx, {
    //   type: "line",
    //   data: {
    //     labels: labels.slice((index - 1) * 7, index * 7),
    //     datasets: [
    //       {
    //         label: "Khối lượng cho ăn",
    //         data: data.slice((index - 1) * 7, index * 7),
    //         fill: false,
    //         borderColor: "rgb(75, 192, 192)",
    //         borderWidth: 2,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
  }, [index]);

  if (!feedingDiaries) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <>
      {feedingDiaries.length === 0 ? (
        <Alert status="info" fontSize="md" w="30rem" mt="1rem">
          <AlertIcon />
          <Text fontSize="md">Chưa có nhật ký nào được ghi nhận</Text>
        </Alert>
      ) : (
        <Box w="1200px" m="0 auto" position="relative">
          <canvas id="myChart"></canvas>
          {index !== 1 && (
            <Box
              as={GrFormPrevious}
              fontSize="5rem"
              position="absolute"
              top="50%"
              left="-10%"
              transform="translate(0, -50%)"
              onClick={() => setIndex(index - 1)}
            ></Box>
          )}
          {index < data.length / 4 && (
            <Box
              as={GrFormNext}
              fontSize="5rem"
              position="absolute"
              top="50%"
              right="-10%"
              transform="translate(0, -50%)"
              onClick={() => setIndex(index + 1)}
            ></Box>
          )}
        </Box>
      )}
    </>
  );
};

export default FeedingChart;
