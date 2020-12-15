const product = {
  tenSanPham: "",
  giaSanPham: "",
  khoiLuong: "",
  phuongThucDongGoi: "",
  hinhAnh: [""],

  pond: {
    tenAo: "",
    dienTich: "",
    matDoTha: "", // mat do tha
    maAo: "",
    seed: {
      tenCongiong: "",
      soLuongConGiong: "",
      tenTraiGiong: "",
      diaChiTraiGiong: "",
      ngayThaGiong: "",
      ngayThuHoach: "",
      ngayTuoiGiong: "",
      pondId: "", // thả tại ao nào
    },
    farm: {
      tenCoSoNuoi: "",
      tenChuCoSoNuoi: "",
      hinhAnh: [""],
      diaChi: "",
      dienTich: "",
      sdt: "",
      themVaoBoi: "",
    },
  },

  feedingDiary: [
    {
      tenAo: "",
      tenThucAn: "",
      ngayChoAn: "",
      khoiLuongChoAn: "",
    },
  ],
};

const farm = {
  tenCoSoNuoi: "",
  tenChuCoSoNuoi: "",
  hinhAnh: [""],
  diaChi: "",
  dienTich: "",
  sdt: "",
  themVaoBoi: "",
};




sanpham{
  traigiong{} -> Thêm các trại giống từ account doanh nghiệp
  trainuoi{} -> Farm model -> Click thu hoạch -> Pending đợi doanh nghiệp xử lý
  cosochebien{} -> Doanh nghiệp xử lý pending -> lựa chọn cơ sở chế biến
  




}

