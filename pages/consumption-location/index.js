import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

import FormControl from "@/components/dashboard/FormControl";
import UploadQR from "@/components/dashboard/UploadQR";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import ProductPreview from "@/components/dashboard/ProductPreview";
import Map from "@/components/Map";
import { message } from "antd";
import ConsumptionLocation from "@/components/dashboard/CunsumptionLocationInfo";
import { transactionsForAsset } from "@/lib/bigchain";

const Index = () => {
  const { handleSubmit, register, errors, control, reset } = useForm();
  const [isSave, setIsSave] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResult, setSearchResult] = useState(null);
  const [consumption, setConsumption] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { data } = useSWR(
    [
      "/api/consumptionlocation",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  const onSubmit = async (values) => {
    setIsSave(true);

    try {
      let res = await fetch("/api/consumptionlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify(values),
      });

      let data = await res.json();

      mutate(
        [
          "/api/consumptionlocation",
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => data,
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setIsSave(false);
  };

  const onSearch = async (values) => {
    setIsSearch(true);

    try {
      let res = await (
        await fetch(
          `https://bigchain.tk/api/v1//assets/?search=${values.qrcode}`
        )
      ).json();

      let transactions = await transactionsForAsset(res[0].id);
      let isMatch = -1;

      if (transactions.length >= 0) {
        setConsumption(transactions);

        isMatch = transactions.findIndex(
          (each) => each.metadata._id === data._id
        );
      }

      // Disable confirm button

      if (isMatch !== -1) {
        setIsConfirmed(true);
      } else {
        setIsConfirmed(false);
      }

      setSearchResult({ ...res[0].data, transactionId: res[0].id });
    } catch (error) {
      console.log(error.message);
      message.error("Không tìm thấy ! Vui lòng thử lại");
    }

    setIsSearch(false);
    /**
     ** Popup Product Preview
     */
    onOpen();
  };

  if (data?.message === "Require setup") {
    return (
      <Layout>
        <Heading color="blackAlpha.800" mb="4rem">
          Thông tin địa điểm tiêu thụ
        </Heading>
        <Box
          width="500px"
          padding="4rem"
          background="#fff"
          boxShadow="0 4px 10px rgba(0,0,0,.1)"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="name">Tên địa điểm tiêu thụ: </FormLabel>
              <Input
                placeholder="Tên địa điểm"
                type="text"
                id="name"
                name="name"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">Địa chỉ: </FormLabel>
              <Input
                placeholder="Địa chỉ"
                type="text"
                id="address"
                name="address"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">SĐT: </FormLabel>
              <Input
                placeholder="Số điện thoại"
                type="number"
                id="phone"
                name="phone"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="coordinate">Tọa độ: </FormLabel>
              <Box height="20rem">
                <Controller
                  name="coordinate"
                  control={control}
                  defaultValue={false}
                  rules={{ required: true }}
                  render={({ onChange }) => <Map onChange={onChange} />}
                />
              </Box>
            </FormControl>

            {isSave ? (
              <Button backgroundColor="gray.400" color="#fff">
                <Spinner mr={4} /> Đang lưu
              </Button>
            ) : (
              <Button type="submit">Lưu</Button>
            )}
          </form>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading color="blackAlpha.800" mb="4rem">
        Thông tin địa điểm tiêu thụ
      </Heading>

      <Grid gridTemplateColumns="repeat(12, 1fr)" gridGap="4rem">
        {/* Scan QR Section */}

        <Box
          gridColumn="span 7"
          boxShadow="0 4px 10px rgba(0,0,0,.1)"
          background="#fff"
          px={16}
          py={12}
        >
          <Heading fontSize="xl" mb="1rem">
            Nhập vào:{" "}
          </Heading>
          <Flex as="form" mb="2rem" onSubmit={handleSubmit(onSearch)}>
            <Input
              placeholder="Mã sản phẩm"
              ref={register({ required: "Required" })}
              name="qrcode"
            />

            {isSearch ? (
              <Button backgroundColor="gray.400" color="#fff">
                <Spinner mr={4} /> Đang tìm
              </Button>
            ) : (
              <Button type="submit">Tìm</Button>
            )}
          </Flex>
          <Heading fontSize="xl" mb="1rem">
            Hoặc{" "}
          </Heading>
          {/* Popup when searching */}
          <UploadQR onSearch={onSearch} />
        </Box>
        {searchResult && (
          <ProductPreview
            consumptionLocation={data}
            consumptionOnChain={consumption}
            data={searchResult}
            isOpen={isOpen}
            onClose={onClose}
            isConfirmed={isConfirmed}
          />
        )}

        {/* ConsumptionLocation Info Section */}

        <ConsumptionLocation data={data} />
      </Grid>
    </Layout>
  );
};

export default Index;
