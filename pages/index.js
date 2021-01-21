import { useState } from "react";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/core";
import styles from "@/styles/Category.module.css";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import SectionPadding from "@/components/SectionPadding";
import NavbarDrawer from "@/components/NavbarDrawer";
import { AiFillControl, AiOutlineQrcode } from "react-icons/ai";
import { FaRegStickyNote } from "react-icons/fa";
import { GiPencil } from "react-icons/gi";
import Footer from "@/components/Footer";

const IndexPage = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Box position="relative">
        <Navbar showDrawer={showDrawer} />
        <NavbarDrawer visible={visible} onClose={onClose} />
        <Hero />
      </Box>
      <SectionPadding>
        {/* <div className="container">
          <div className={styles.grid}>
            <div className={styles.category}>
              <div className={styles.overlay}></div>
              <h2 className={styles.text}>Nhóm cá biển</h2>
            </div>
            <div className={styles.category}>
              <div className={styles.overlay}></div>
              <h2 className={styles.text}>Nhóm cá nước ngọt</h2>
            </div>
            <div className={styles.category}>
              <div className={styles.overlay}></div>
              <h2 className={styles.text}>Nhóm giáp xác</h2>
            </div>
            <div className={styles.category}>
              <div className={styles.overlay}></div>
              <h2 className={styles.text}>Nhóm nhuyễn thể</h2>
            </div>
          </div>
        </div> */}

        <>
          <Heading className="heading" marginBottom={16}>
            Tính năng của TraceOrigin
          </Heading>

          <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            className="container"
            columnGap={16}
            rowGap={16}
          >
            <Box
              gridColumn="span 3"
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              padding="40px 30px"
              textAlign="center"
            >
              <Heading fontSize="md" mb={4}>
                Quản lý sản xuất nguồn gốc
              </Heading>
              <Text>
                Traceorigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà
                cung cấp tới tay người tiêu dùng .
              </Text>
              <Box
                as={AiOutlineQrcode}
                height="60px"
                width="60px"
                margin="0 auto"
                mt={8}
                color="#007bff"
              />
            </Box>
            <Box
              gridColumn="span 3"
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              padding="40px 30px"
              textAlign="center"
            >
              <Heading fontSize="md" mb={4}>
                Thông tin ghi chép đầy đủ, đa dạng
              </Heading>
              <Text>
                Traceorigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà
                cung cấp tới tay người tiêu dùng .
              </Text>
              <Box
                as={FaRegStickyNote}
                height="60px"
                width="60px"
                margin="0 auto"
                mt={8}
                color="#007bff"
              />
            </Box>
            <Box
              gridColumn="span 3"
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              padding="40px 30px"
              textAlign="center"
            >
              <Heading fontSize="md" mb={4}>
                Kiểm soát chất lượng
              </Heading>
              <Text>
                Traceorigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà
                cung cấp tới tay người tiêu dùng .
              </Text>
              <Box
                as={AiFillControl}
                height="60px"
                width="60px"
                margin="0 auto"
                mt={8}
                color="#007bff"
              />
            </Box>
            <Box
              gridColumn="span 3"
              background="#fff"
              borderRadius="3px"
              boxShadow="0 10px 30px rgb(30 126 245 / 0.2)"
              padding="40px 30px"
              textAlign="center"
            >
              <Heading fontSize="md" mb={4}>
                Ghi chép nhật ký nuôi trồng
              </Heading>
              <Text>
                Traceorigin là cầu nối uy tín đảm bảo xác thực hàng hóa của nhà
                cung cấp tới tay người tiêu dùng .
              </Text>
              <Box
                as={GiPencil}
                height="60px"
                width="60px"
                margin="0 auto"
                mt={8}
                color="#007bff"
              />
            </Box>
          </Grid>
        </>
      </SectionPadding>
      <SectionPadding>
        <Products />
      </SectionPadding>
      <Footer />
    </>
  );
};

export default IndexPage;
