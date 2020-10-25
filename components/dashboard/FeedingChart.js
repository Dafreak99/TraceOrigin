import { Box } from "@chakra-ui/core";
import Chart from "chart.js";
import { useEffect, useState } from "react";

import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const FeedingChart = () => {
  const values = [
    {
      _id: "5f9421434959fa23c00d7830",
      ghiChu: "Test cho an",
      khoiLuong: "12",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cfefe03ac3f2580ee049f",
      ngayThangNam: "8/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424484959fa23c00d7831",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cff9003ac3f2580ee04a0",
      khoiLuong: "25",
      ghiChu: "",
      ngayThangNam: "9/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424ad4959fa23c00d7833",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cff9003ac3f2580ee04a0",
      khoiLuong: "19",
      ghiChu: "",
      ngayThangNam: "10/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424c84959fa23c00d7834",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cfefe03ac3f2580ee049f",
      khoiLuong: "15",
      ghiChu: "",
      ngayThangNam: "11/10/2020",
      __v: 0,
    },
    {
      _id: "5f9421434959fa23c00d7830",
      ghiChu: "Test cho an",
      khoiLuong: "12",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cfefe03ac3f2580ee049f",
      ngayThangNam: "12/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424484959fa23c00d7831",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cff9003ac3f2580ee04a0",
      khoiLuong: "25",
      ghiChu: "",
      ngayThangNam: "13/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424ad4959fa23c00d7833",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cff9003ac3f2580ee04a0",
      khoiLuong: "19",
      ghiChu: "",
      ngayThangNam: "14/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424c84959fa23c00d7834",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cfefe03ac3f2580ee049f",
      khoiLuong: "15",
      ghiChu: "",
      ngayThangNam: "15/10/2020",
      __v: 0,
    },
    {
      _id: "5f9421434959fa23c00d7830",
      ghiChu: "Test cho an",
      khoiLuong: "12",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cfefe03ac3f2580ee049f",
      ngayThangNam: "16/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424484959fa23c00d7831",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cff9003ac3f2580ee04a0",
      khoiLuong: "25",
      ghiChu: "",
      ngayThangNam: "17/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424ad4959fa23c00d7833",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cff9003ac3f2580ee04a0",
      khoiLuong: "19",
      ghiChu: "",
      ngayThangNam: "18/10/2020",
      __v: 0,
    },
    {
      _id: "5f9424c84959fa23c00d7834",
      ao: "5f87113aa0e6d61860af5bcc",
      thucAn: "5f8cfefe03ac3f2580ee049f",
      khoiLuong: "15",
      ghiChu: "",
      ngayThangNam: "19/10/2020",
      __v: 0,
    },
  ];

  let labels = values.map((each) => each.ngayThangNam);
  let data = values.map((each) => +each.khoiLuong);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels.slice((index - 1) * 4, index * 4),
        datasets: [
          {
            label: "# of Votes",
            data: data.slice((index - 1) * 4, index * 4),
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
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
  }, [index]);

  return (
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
  );
};

export default FeedingChart;
