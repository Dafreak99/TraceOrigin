import { Box, Flex, Grid } from "@chakra-ui/core";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import SectionPadding from "@/components/SectionPadding";
import styles from "@/styles/Category.module.css";

const IndexPage = () => {
  return (
    <>
      <Box position="relative">
        <Navbar />
        <Hero />
      </Box>
      <SectionPadding>
        <div className="container">
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
        </div>
        <Products />
      </SectionPadding>
    </>
  );
};

export default IndexPage;
