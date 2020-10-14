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
} from "@chakra-ui/core";
import Link from "next/link";
import { MdBrandingWatermark, MdInfo } from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";
import { GiFoodChain } from "react-icons/gi";
import AddFoodModal from "./dashboard/AddFoodModal";

const Sidebar = () => {
  return (
    <Box height="100vh" width="15vw" backgroundColor="gray.900" color="#fff">
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
          <Accordion allowToggle>
            <AccordionItem border="none">
              <AccordionHeader
                outline="none"
                px={8}
                py={2}
                _focus={{}}
                _hover={{ backgroundColor: "#007bff" }}
              >
                <Box flex="1" textAlign="left">
                  <ListIcon icon={MdBrandingWatermark} color="gray.50" />
                  Quản lí
                </Box>
                <AccordionIcon />
              </AccordionHeader>
              <AccordionPanel p={0} mt={3}>
                <List spacing={3}>
                  <ListItem>
                    <AddFoodModal />
                  </ListItem>
                  <ListItem>
                    <Link href="/dashboard/diary">
                      <a className="sidebar__link--sub">
                        <ListIcon icon={GiFoodChain} color="gray.50" />
                        Nhật ký hằng ngày
                      </a>
                    </Link>
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
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
      </List>
    </Box>
  );
};

export default Sidebar;
