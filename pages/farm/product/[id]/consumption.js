import FormControl from "@/components/dashboard/FormControl";
import Layout from "@/components/dashboard/Layout";
import Map from "@/components/Map";
import {
  Box,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
  Button,
} from "@chakra-ui/core";
// import { Button } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Consumption = () => {
  const router = useRouter();
  const [entry, setEntry] = useState(null);

  const { handleSubmit, register, errors, control, reset } = useForm();

  const [locations, setLocations] = useState([{}, {}]);

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Layout>
      <Box px={16} py={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex align="center" justify="space-between">
            <Heading mt={10} mb={5}>
              Thêm địa điểm tiêu thụ sản phẩm
            </Heading>
            <Button type="submit">Thêm</Button>
          </Flex>
          {locations &&
            locations.map((location, i) => (
              <Box
                background="#fff"
                padding="2rem 3rem"
                boxShadow="0 10px 30px rgba(0,0,0,.1)"
                width="80%"
                mb="4rem"
              >
                <Grid
                  gridTemplateColumns="repeat(2,1fr)"
                  gridColumnGap="2rem"
                  position="relative"
                >
                  <Flex
                    h="50px"
                    w="50px"
                    borderRadius="50%"
                    background="#006aff24"
                    justify="center"
                    align="center"
                    gridColumn="span 2"
                    mb="1rem"
                  >
                    <Text color="#006aff" fontSize="1rem" fontWeight="bold">
                      {i + 1}
                    </Text>
                  </Flex>
                  <FormControl>
                    <FormLabel htmlFor="name">Tên địa điểm tiêu thụ</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      ref={register({
                        required: "Required",
                      })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="address">SĐT: </FormLabel>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      ref={register({
                        required: "Required",
                      })}
                    />
                  </FormControl>
                  <FormControl style={{ gridColumn: "span 2" }}>
                    <FormLabel htmlFor="address">Địa chỉ: </FormLabel>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      ref={register({
                        required: "Required",
                      })}
                    />
                  </FormControl>

                  <FormControl style={{ gridColumn: "span 2" }}>
                    <FormLabel htmlFor="address">Vị trí: </FormLabel>
                    <Box height="20rem">
                      <Map entry={entry} setEntry={setEntry} />
                    </Box>
                  </FormControl>
                </Grid>
              </Box>
            ))}
        </form>
      </Box>
    </Layout>
  );
};

export default Consumption;
