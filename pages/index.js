import { Box, Flex } from "@chakra-ui/core";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import SectionPadding from "@/components/SectionPadding";
import styles from "@/styles/Category.module.css";

const IndexPage = () => {
  return (
    <>
      <Box position="relative">
        {/* <Navbar float /> */}
        <Navbar />
        <Hero />
      </Box>
      <SectionPadding>
        <div className="container">
          <Flex height="20rem" w="100%">
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
          </Flex>
        </div>
        <Products />
      </SectionPadding>
    </>
  );
};

export default IndexPage;
