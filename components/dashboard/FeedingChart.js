import fetcher from "@/utils/fetcher";
import { Alert, AlertIcon, Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Chart } from "chart.js";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import useSWR from "swr";

const FeedingChart = ({ pondId }) => {
 
  const { data: feedingDiaries, error } = useSWR(
    [
      `/api/feedingdiary/pond/${pondId}`,
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const [index, setIndex] = useState(1);

  useEffect(() => {
    if(feedingDiaries && feedingDiaries.length > 0){
      insertChart();
    }
  }, [index]);


  useEffect(()=>{
    if(feedingDiaries && feedingDiaries.length > 0){
      insertChart()
    }
  }, [feedingDiaries]);


  const getLabels = ()=>{
    return feedingDiaries.map((each) => each.createdDate);   
  }
  const getData = ()=>{
    return feedingDiaries.map((each) => +each.weight);
  }

  const VALUE = 4;

  const insertChart = ()=>{
    var ctx = document.getElementById("myChart");
     new Chart(ctx, {
      type: "line",
      data: {
        labels: getLabels().slice((index - 1) * VALUE, index * VALUE),
        datasets: [
          {
            label: 'Khối lượng cho ăn (kg)',
            data: getData().slice((index - 1) * VALUE, index * VALUE),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }



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
        <Box w="1200px" m="0 auto" position="relative" bg="white" mt="1rem" boxShadow="0 10px 15px rgba(0,0,0,.1)" borderRadius="6px" p="20px 10px">
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
          {index < getData().length / VALUE && (
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
