import { Box } from "@chakra-ui/core";
import Chart from "chart.js";
import { useEffect, useState } from "react";

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
            // borderColor: [
            //   "rgba(255, 99, 132, 1)",
            //   "rgba(54, 162, 235, 1)",
            //   "rgba(255, 206, 86, 1)",
            //   "rgba(75, 192, 192, 1)",
            //   "rgba(153, 102, 255, 1)",
            //   "rgba(255, 159, 64, 1)",
            // ],
            // borderWidth: 1,
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
    <Box h="800px" w="1200px" m="0 auto">
      <canvas id="myChart"></canvas>
      {index !== 1 && (
        <Box fontSize="5rem" onClick={() => setIndex(index - 1)}>
          Prev
        </Box>
      )}
      {index < data.length / 4 && (
        <Box fontSize="5rem" onClick={() => setIndex(index + 1)}>
          Next
        </Box>
      )}
    </Box>
  );
};

export default FeedingChart;
