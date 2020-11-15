import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
  List,
  ListItem,
  ListIcon,
  PseudoBox,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
  Tooltip,
} from "@chakra-ui/core";
import Link from "next/link";
import { MdBrandingWatermark, MdInfo } from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";
import { GiFoodChain, GiMedicines, GiParmecia } from "react-icons/gi";
import { BsBarChartFill, BsFillPlusCircleFill } from "react-icons/bs";

import AddFoodModal from "../components/dashboard/AddFoodModal";
import AddMedicineModal from "../components/dashboard/AddMedicineModal";
import { BiFoodTag } from "react-icons/bi";

const Sidebar = () => {
  return (
    <Box height="100vh" width="" backgroundColor="gray.900" color="#fff">
      <Flex
        dir="row"
        align="center"
        justify="center"
        height="80px"
        w="100%"
        borderBottom="1px solid #353638"
      >
        <Image src="/water.svg" height="32px" mr={2}></Image>
        <Text color="#fff" fontWeight="medium" fontSize="20px">
          Trace Origin.
        </Text>
      </Flex>
      {/* End Logo */}
      <List spacing={3}>
        <ListItem mt={8}>
          <Link href="/dashboard">
            <a className="sidebar__link">
              <ListIcon icon={MdInfo} color="gray.50" />
              Thông tin
            </a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/dashboard/ponds">
            <a className="sidebar__link">
              <ListIcon icon={MdBrandingWatermark} color="gray.50" />
              Ao
            </a>
          </Link>
        </ListItem>

        <ListItem>
          <Link href="/dashboard/notes">
            <a className="sidebar__link">
              <ListIcon icon={FaStickyNote} color="gray.50" />
              Ghi chú
            </a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/dashboard/diary">
            <a className="sidebar__link">
              <ListIcon icon={GiFoodChain} color="gray.50" />
              Nhật ký hằng ngày
            </a>
          </Link>
        </ListItem>

        <ListItem>
          <Accordion allowToggle allowMultiple>
            <AccordionItem border="none" mb={3}>
              <AccordionHeader
                outline="none"
                px={8}
                py={2}
                _focus={{}}
                _hover={{ backgroundColor: "#007bff" }}
              >
                <Box flex="1" textAlign="left">
                  <ListIcon icon={BsFillPlusCircleFill} color="gray.50" />
                  {/* Thêm */}
                </Box>
                <AccordionIcon />
              </AccordionHeader>
              <AccordionPanel p={0} mt={3}>
                <List spacing={3}>
                  <ListItem>
                    <AddFoodModal />
                  </ListItem>
                  <ListItem>
                    <AddMedicineModal />
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <AccordionHeader
                outline="none"
                px={8}
                py={2}
                _focus={{}}
                _hover={{ backgroundColor: "#007bff" }}
              >
                <Box flex="1" textAlign="left">
                  <ListIcon icon={BsBarChartFill} color="gray.50" />
                  Biểu đồ
                </Box>
                <AccordionIcon />
              </AccordionHeader>
              <AccordionPanel p={0} mt={3}>
                <List spacing={3}>
                  <ListItem>
                    <Link href="/dashboard/feedingchart">
                      <a className="sidebar__link--sub">
                        <ListIcon icon={GiFoodChain} color="gray.50" />
                        Cho ăn
                      </a>
                    </Link>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ListItem>
        <ListItem>
          <Link href="/dashboard/food">
            <a className="sidebar__link">
              <ListIcon icon={GiParmecia} color="gray.50" />
              Thức ăn
            </a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/dashboard/medicine">
            <a className="sidebar__link">
              <ListIcon icon={GiMedicines} color="gray.50" />
              Thuốc
            </a>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/dashboard/feedingdiary">
            <a className="sidebar__link">
              <ListIcon icon={BiFoodTag} color="gray.50" />
              Cho ăn
            </a>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
