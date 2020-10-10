const product = {
  productName: "",
  productPrice: "",
  weight: "",
  packingMethod: "",
  image: [""],

  pond: {
    pondName: "",
    pondAcreage: "",
    stockingDensity: "", // mat do tha
    pondCode: "",
    seed: {
      seedName: "",
      seedQuantity: "",
      seedFarmName: "",
      seedFarmAddress: "",
      seedImportDate: "",
      cultivateDate: "",
      harvestDate: "",
      seedAge: "",
      pondId: "", // thả tại ao nào
    },
    farm: {
      farmName: "",
      farmOwner: "",
      farmImage: [""],
      farmAddress: "",
      farmAcreage: "",
      phoneNumber: "",
      addedBy: "",
    },
  },

  feedingDiary: [
    {
      pondName: "",
      foodName: "",
      feedingDate: "",
      feedingWeight: "",
    },
  ],
};
