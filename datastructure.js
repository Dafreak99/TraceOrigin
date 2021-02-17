const product = {
  name: "",
  price: "",
  weight: "",
  phuongThucDongGoi: "",
  images: [""],

  pond: {
    name: "",
    area: "",
    stockingDensity: "", // mat do tha
    code: "",
    seed: {
      tenCongiong: "",
      quantity: "",
      name: "",
      address: "",
      stockingDate: "",
      harvestedDate: "",
      seedAge: "",
      pondId: "", // thả tại ao nào
    },
    farm: {
      name: "",
      owner: "",
      images: [""],
      address: "",
      area: "",
      phone: "",
      createdBy: "",
    },
  },

  feedingDiary: [
    {
      name: "",
      name: "",
      ngayChoAn: "",
      khoiLuongChoAn: "",
    },
  ],
};

const farm = {
  name: "",
  owner: "",
  images: [""],
  address: "",
  area: "",
  phone: "",
  createdBy: "",
};




sanpham{
  traigiong{} -> Thêm các trại giống từ account doanh nghiệp
  trainuoi{} -> Farm model -> Click thu hoạch -> Pending đợi doanh nghiệp xử lý
  cosochebien{} -> Doanh nghiệp xử lý pending -> lựa chọn cơ sở chế biến
}

// TODO: Thêm cơ sở chế biến


// Nếu thêm trại giống từ doanh nghiệp
// Sau đó trại nuôi có thể lựa chọn từ dropdown thì somehow 
// phải có connection between trainuoi va doanhnghiep


