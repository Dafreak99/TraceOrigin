import { Image } from "@chakra-ui/image";

export const feedingColumns = [
  {
    title: "Ngày ghi nhận",
    dataIndex: "createdDate",
  },
  {
    title: "Ghi chú",
    dataIndex: "note",
  },
  {
    title: "Khối lượng cho ăn (kg)",
    dataIndex: "weight",
  },
  {
    title: "Tên thức ăn",
    dataIndex: ["food", "name"],
  },
  {
    title: "Hình ảnh",
    dataIndex: ["food", "images", [0]],
    render: (text) => <Image src={text} height="100px" />,
  },
];

export const medicineColumns = [
  {
    title: "Ngày ghi nhận",
    dataIndex: "createdDate",
  },

  {
    title: "Khối lượng sử dụng (kg)",
    dataIndex: "weight",
  },
  {
    title: "Tên thuốc",
    dataIndex: ["medicine", "name"],
  },
  {
    title: "Tỉ lệ trộn với thức ăn (%)",
    dataIndex: ["mixingRatio"],
  },
  {
    title: "Hình ảnh",
    dataIndex: ["medicine", "images", [0]],
    render: (text) => <Image src={text} height="100px" />,
  },
];

export const dailyColumns = [
  {
    title: "Ngày ghi nhận",
    dataIndex: "createdDate",
  },

  {
    title: "Ghi chú",
    dataIndex: "note",
  },
];

export const pondEnvColumns = [
  {
    title: "Ngày ghi nhận",
    dataIndex: "createdDate",
  },

  {
    title: "Oxy (mg/l)",
    dataIndex: "oxy",
  },

  {
    title: "PH",
    dataIndex: "ph",
  },

  {
    title: "Độ trong (mg/l)",
    dataIndex: "clarity",
  },

  {
    title: "Độ mặn (mg/l)",
    dataIndex: "salinity",
  },
  {
    title: "H2S (mg/l)",
    dataIndex: "H2S",
  },

  {
    title: "NH3 (mg/l)",
    dataIndex: "NH3",
  },
  {
    title: "Độ kiềm (mg/l)",
    dataIndex: "alkalinity",
  },
];

export const replaceWaterColumns = [
  {
    title: "Ngày thay nước",
    dataIndex: "createdDate",
  },

  {
    title: "Lượng nước (%)",
    dataIndex: "percentage",
  },
];
