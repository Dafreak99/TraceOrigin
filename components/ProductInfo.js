import {
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Alert,
  AlertIcon,
  Text,
  Grid,
} from "@chakra-ui/react";
import { Collapse, Tabs } from "antd";

import GreenDot from "./GreenDot";
import { FaPhone } from "react-icons/fa";
import { GiWaterSplash } from "react-icons/gi";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import { Table, Th, Tr, Td } from "./Table";
import { HiUser } from "react-icons/hi";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { FaFax, FaFish, FaVectorSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineNumber } from "react-icons/ai";

const { Panel } = Collapse;
const { TabPane } = Tabs;

// const ProductInfo = ({ data, consumption }) => {
//   return (
//     <Box width={{ base: "100%", lg: "50%" }} mr="20px" mb="30px">
//       <Flex w="100%" borderRadius="3px">
//         <Tabs defaultActiveKey="1">
//           <TabPane tab="Chi tiết sản phẩm" key="1">
//             <Box
//               border="2px solid rgb(19 154 243 / 10%)"
//               p={8}
//               borderBottom="3px solid #007bff"
//             >
//               <Tab1 {...data} />
//             </Box>
//           </TabPane>
//           <TabPane tab="Nhật ký" key="2">
//             <Box
//               border="2px solid rgb(19 154 243 / 10%)"
//               p={8}
//               borderBottom="3px solid #007bff"
//             >
//               <Tab2 data={data} />
//             </Box>
//           </TabPane>
//           <TabPane tab="Chứng thực" key="3">
//             <Box
//               border="2px solid rgb(19 154 243 / 10%)"
//               p={8}
//               borderBottom="3px solid #007bff"
//             >
//               <SimpleReactLightbox>
//                 <SRLWrapper
//                   options={{ settings: { slideTransitionSpeed: 1 } }}
//                   style={{ marginTop: "30px" }}
//                 >
//                   <Flex mt="1rem">
//                     {data.farm.authentication.images.map((image) => (
//                       <Image src={image} height="150px" mr="1rem" />
//                     ))}
//                   </Flex>
//                 </SRLWrapper>
//               </SimpleReactLightbox>
//             </Box>
//           </TabPane>
//           {consumption.length > 0 && (
//             <TabPane tab="Địa điểm tiêu thụ" key="4">
//               <Box
//                 border="2px solid rgb(19 154 243 / 10%)"
//                 p={8}
//                 borderBottom="3px solid #007bff"
//               >
//                 {consumption.map(({ id, metadata }) => (
//                   <>
//                     <Alert status="success" my="1rem" w="100%">
//                       <AlertIcon />
//                       <Text fontSize="md">
//                         TransactionID:{" "}
//                         <a
//                           target="blank"
//                           href={
//                             "https://bigchain.tk/api/v1//transactions/" + id
//                           }
//                         >
//                           {id.slice(0, 50)}
//                         </a>
//                       </Text>
//                     </Alert>
//                     <List spacing={3}>
//                       <ListItem>
//                         <Flex align="center">
//                           <Box as={FaFish} mr="0.5rem" />
//                           <Text fontWeight="bold">
//                             Tên địa điểm:{" "}
//                             <Text as="span" fontWeight="normal">
//                               {metadata.name}
//                             </Text>
//                           </Text>
//                         </Flex>
//                       </ListItem>
//                       <ListItem>
//                         <Flex align="center">
//                           <Box as={MdLocationOn} mr="0.5rem" />
//                           <Text fontWeight="bold">
//                             Địa chỉ:{" "}
//                             <Text as="span" fontWeight="normal">
//                               {metadata.address}
//                             </Text>
//                           </Text>
//                         </Flex>
//                       </ListItem>
//                       <ListItem>
//                         <Flex align="center">
//                           <Box as={FaPhone} mr="0.5rem" />
//                           <Text fontWeight="bold">
//                             SĐT:{" "}
//                             <Text as="span" fontWeight="normal">
//                               {metadata.phone}
//                             </Text>
//                           </Text>
//                         </Flex>
//                       </ListItem>
//                     </List>
//                   </>
//                 ))}
//               </Box>
//             </TabPane>
//           )}
//         </Tabs>
//       </Flex>
//     </Box>
//   );
// };

export const Tab1 = ({ seed: { stockingDate, hatchery }, farm }) => {
  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)">
      {/* CƠ SỞ NUÔI TRỒNG */}
      <List spacing={3} gridColumn={{ base: "span 2", md: "span 1" }}>
        <Flex alignItems="center">
          <GreenDot />
          <Heading size="md">Cơ sở nuôi trồng</Heading>
        </Flex>
        <ListItem>
          <Image src={farm.images[0]} />
        </ListItem>
        <ListItem>
          <Text fontWeight="bold" textTransform="uppercase" mt="2rem">
            {farm.name}
          </Text>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={HiUser} mr="0.5rem" />
            <Text fontWeight="bold">
              Chủ cơ sở:{" "}
              <Text as="span" fontWeight="normal">
                {farm.owner}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={MdLocationOn} mr="0.5rem" />
            <Text fontWeight="bold">
              Địa chỉ:{" "}
              <Text as="span" fontWeight="normal">
                {farm.address}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={ImPhone} mr="0.5rem" />
            <Text fontWeight="bold">
              Số điện thoại:{" "}
              <Text as="span" fontWeight="normal">
                {farm.phone}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={FaVectorSquare} mr="0.5rem" />
            <Text fontWeight="bold">
              Diện tích cơ sở:{" "}
              <Text as="span" fontWeight="normal">
                {farm.area} m2
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={FaFax} mr="0.5rem" />
            <Text fontWeight="bold">
              Fax:{" "}
              <Text as="span" fontWeight="normal">
                {farm.fax}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={IoIosMail} mr="0.5rem" />
            <Text fontWeight="bold">
              Email:{" "}
              <Text as="span" fontWeight="normal">
                {farm.email}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={CgWebsite} mr="0.5rem" />
            <Text fontWeight="bold">
              Website:{" "}
              <Box
                as="a"
                fontWeight="normal"
                href={farm.website}
                target="__blank"
              >
                {farm.website}
              </Box>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={AiOutlineNumber} mr="0.5rem" />
            <Text fontWeight="bold">
              Mã số thuế:{" "}
              <Text as="span" fontWeight="normal">
                {farm.MST}
              </Text>
            </Text>
          </Flex>
        </ListItem>

        <SimpleReactLightbox>
          <SRLWrapper
            options={{ settings: { slideTransitionSpeed: 1 } }}
            style={{ marginTop: "30px" }}
          >
            <Flex mt="1rem" flexWrap="wrap">
              {farm.authentication.images.map((image) => (
                <Image src={image} height="150px" mr="1rem" />
              ))}
            </Flex>
          </SRLWrapper>
        </SimpleReactLightbox>
      </List>
      {/* THÔNG TIN XUẤT XỨ */}
      <List
        spacing={3}
        mt={4}
        gridColumn={{ base: "span 2", md: "span 1" }}
        mb="2rem"
        mt={{ base: "2rem", md: 0 }}
      >
        <Flex mb={6}>
          <GreenDot />
          <Heading fontWeight="bold" fontSize="20px">
            Thông tin xuất xứ con giống
          </Heading>
        </Flex>
        <ListItem mt="1rem" mb="2rem">
          <Image
            src="http://portal1.traceverified.com/Images/Certificates/organica-logo.png"
            h="5rem"
          />
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={GiWaterSplash} mr="0.5rem" />
            <Text fontWeight="bold">
              Tên trại giống:{" "}
              <Text as="span" fontWeight="normal">
                {hatchery.name}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={MdLocationOn} mr="0.5rem" />
            <Text fontWeight="bold">
              Địa chỉ trại giống:{" "}
              <Text as="span" fontWeight="normal">
                {hatchery.address}
              </Text>
            </Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex align="center">
            <Box as={MdDateRange} mr="0.5rem" />
            <Text fontWeight="bold">
              Ngày thả giống:{" "}
              <Text as="span" fontWeight="normal">
                {stockingDate}
              </Text>
            </Text>
          </Flex>
        </ListItem>
      </List>
    </Grid>
  );
};

export const Tab2 = ({ data }) => {
  return (
    <>
      <Collapse
        defaultActiveKey={["1"]}
        ghost
        style={{ marginTop: "2rem", gridColumn: "span 12" }}
      >
        <Panel header="Nhật ký cho ăn" key="1">
          {data.feeding.map(
            ({ createdDate, note, weight, food: { name, images } }, i) => (
              <Table>
                <Tr>
                  <Th>#</Th>
                  <Th>Ngày cho ăn</Th>
                  <Th>Tên thức ăn</Th>
                  <Th>Khối lượng</Th>
                  <Th>Hình ảnh</Th>
                </Tr>
                <Tr>
                  <Td>{i + 1}</Td>
                  <Td>{createdDate}</Td>
                  <Td>{name}</Td>
                  <Td>{weight} KG</Td>
                  <Td>
                    <Image src={images[0]} h="100px" objectFit="cover" />
                  </Td>
                </Tr>
              </Table>
            )
          )}
        </Panel>

        <Panel header="Nhật ký sử dụng thuốc" key="2">
          {data.usingMedicine.map(
            ({ createdDate, weight, medicine: { name, images } }, i) => (
              <Table>
                <Tr>
                  <Th>#</Th>
                  <Th>Ngày sử dụng</Th>
                  <Th>Tên thuốc</Th>
                  <Th>Khối lượng</Th>
                  <Th>Hình ảnh</Th>
                </Tr>
                <Tr>
                  <Td>{i + 1}</Td>
                  <Td>{createdDate}</Td>
                  <Td>{name}</Td>
                  <Td>{weight} KG</Td>
                  <Td>
                    <Image src={images[0]} h="100px" objectFit="cover" />
                  </Td>
                </Tr>
              </Table>
            )
          )}
        </Panel>
        <Panel header="Nhật ký hằng ngày" key="3">
          {data.dailyNote.map(({ createdDate, note }, i) => (
            <Table>
              <Tr>
                <Th>#</Th>
                <Th>Ngày tháng</Th>
                <Th>Ghi chép</Th>

                {/* <Th>Hình ảnh</Th> */}
              </Tr>
              <Tr>
                <Td>{i + 1}</Td>
                <Td>{createdDate}</Td>
                <Td>{note}</Td>
              </Tr>
            </Table>
          ))}
        </Panel>
        <Panel header="Môi trường ao" key="4">
          {data.pondEnvironment.map(
            ({ createdDate, H2S, NH3, alkalinity, oxy, ph, salinity }, i) => (
              <Table>
                <Tr>
                  <Th>#</Th>
                  <Th>Ngày ghi</Th>
                  <Th>Oxy(mg/l)</Th>
                  <Th>pH</Th>
                  <Th>Độ kiềm</Th>
                  <Th>Độ mặn</Th>
                  <Th>H2S(mg/l)</Th>
                  <Th>NH3(mg/l)</Th>
                </Tr>
                <Tr>
                  <Td>{i + 1}</Td>
                  <Td>{createdDate}</Td>
                  <Td>{oxy}</Td>
                  <Td>{ph}</Td>
                  <Td>{alkalinity}</Td>
                  <Td>{salinity}</Td>
                  <Td>{H2S}</Td>
                  <Td>{NH3}</Td>
                </Tr>
              </Table>
            )
          )}
        </Panel>
      </Collapse>
    </>
  );
};
