import { useState } from "react";

import { Box, Flex, Image, Text } from "@chakra-ui/core";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  InfoCircleOutlined,
  InsertRowBelowOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Header from "./Header";
import Icon from "@ant-design/icons";
import { FiAperture, FiPackage, FiUsers } from "react-icons/fi";
import {
  FaBorderAll,
  FaChartBar,
  FaStickyNote,
  FaWarehouse,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { RiBuilding4Fill, RiBuildingFill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const CommonLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content
          style={{
            margin: "0 16px",
            height: "calc(100vh - 64px)",
            overflowY: "scroll",
          }}
          className="dashboard__content"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

const FarmSidebar = () => {
  const { route } = useRouter();

  let params = route.split("/");
  let key;
  if (params.length === 2) {
    key = "default";
  } else if (params.length === 3) {
    key = params[2];
  }

  let predefinedKey = {
    food: "management",
    medicine: "management",
    feedingdiary: "diary",
    usingmedicinediary: "diary",
    feedingchart: "chart",
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[key]}
      mode="inline"
      defaultOpenKeys={[predefinedKey[key] ? predefinedKey[key] : null]}
    >
      <Menu.Item key="default" icon={<InfoCircleOutlined />}>
        <Link href="/farm">
          <a>Thông tin</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="ponds" icon={<Icon component={FaBorderAll} />}>
        <Link href="/farm/ponds">
          <a>Ao</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="dairy" icon={<InsertRowBelowOutlined />}>
        <Link href="/farm/diary">
          <a>Nhật ký hằng ngày </a>
        </Link>
      </Menu.Item>

      <SubMenu
        icon={<PlusCircleOutlined />}
        key="management"
        title={
          <span>
            <span>Quản lí</span>
          </span>
        }
      >
        <Menu.Item key="food" icon={<DesktopOutlined />}>
          <Link href="/farm/food">
            <a> Thức ăn</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="medicine" icon={<DesktopOutlined />}>
          <Link href="/farm/medicine">
            <a> Thuốc</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        icon={<Icon component={FaStickyNote} />}
        key="diary"
        title={
          <span>
            <span>Nhât ký</span>
          </span>
        }
      >
        <Menu.Item key="feedingdiary" icon={<DesktopOutlined />}>
          <Link href="/farm/feedingdiary">
            <a> Cho ăn</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="usingmedicinediary" icon={<DesktopOutlined />}>
          <Link href="/farm/usingmedicinediary">
            <a> Sử dụng thuốc</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        icon={<Icon component={FaChartBar} />}
        key="chart"
        title={
          <span>
            <span>Biểu đồ</span>
          </span>
        }
      >
        <Menu.Item key="feedingchart" icon={<DesktopOutlined />}>
          <Link href="/farm/feedingchart">
            <a> Cho ăn</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="product" icon={<Icon component={FiAperture} />}>
        <Link href="/farm/product">
          <a>Sản phẩm</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="worker" icon={<Icon component={FiUsers} />}>
        <Link href="/farm/worker">
          <a>Danh sách nhân công</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="hatchery" icon={<Icon component={FiUsers} />}>
        <Link href="/farm/hatchery">
          <a>Danh sách trại giống</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const BusinessSidebar = () => {
  const { route } = useRouter();

  let params = route.split("/");
  let key;
  if (params.length === 2) {
    key = "default";
  } else if (params.length === 3) {
    key = params[2];
  }

  return (
    <Menu theme="dark" defaultSelectedKeys={[key]} mode="inline">
      <Menu.Item key="default" icon={<InfoCircleOutlined />}>
        <Link href="/business">
          <a>Thông tin</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="product" icon={<InfoCircleOutlined />}>
        <Link href="/business/product">
          <a>Sản phẩm</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="hatchery" icon={<Icon component={RiBuilding4Fill} />}>
        <Link href="/business/hatchery">
          <a>Trại giống</a>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="processingfacility"
        icon={<Icon component={RiBuildingFill} />}
      >
        <Link href="/business/processingfacility">
          <a>Cơ sở chế biến</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="warehouse" icon={<Icon component={FaWarehouse} />}>
        <Link href="/business/warehouse">
          <a>Kho hàng</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="packing" icon={<Icon component={FiPackage} />}>
        <Link href="/business/packing">
          <a>Quy cách đóng gói</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="consignment" icon={<Icon component={FiPackage} />}>
        <Link href="/business/consignment">
          <a>Quản lý lô hàng</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const QualityControlSidebar = () => {
  const { route } = useRouter();

  let params = route.split("/");
  let key;
  if (params.length === 2) {
    key = "default";
  } else if (params.length === 3) {
    key = params[2];
  }

  return (
    <Menu theme="dark" defaultSelectedKeys={[key]} mode="inline">
      <Menu.Item key="default" icon={<InfoCircleOutlined />}>
        <Link href="/quanlitycontrol">
          <a>Sản phẩm chờ duyệt</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const Sidebar = () => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  const ISSERVER = typeof window === "undefined";

  let user;

  if (!ISSERVER) {
    user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/signin");
    }
  }

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");

    router.push("/");
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Flex
        dir="row"
        align="center"
        justify="center"
        height="80px"
        w="100%"
        borderBottom="1px solid #353638"
      >
        <Image src="/water.svg" height="32px" mr={2}></Image>
        <Text
          color="#fff"
          fontWeight="medium"
          fontSize="20px"
          className="logo--name"
        >
          Trace Origin.
        </Text>
      </Flex>

      {user && user.type === "farm" ? (
        <FarmSidebar />
      ) : (
        <QualityControlSidebar />
      )}
      <Flex
        justify="center"
        align="center"
        position="absolute"
        bottom="10%"
        left="50%"
        transform="translateX(-50%)"
        onClick={logout}
        cursor="pointer"
      >
        <Box as={AiOutlineLogout} color="#fff" h="32px" w="32px" />
        <Text color="#fff" ml="10px">
          Logout
        </Text>
      </Flex>
    </Sider>
  );
};

export default CommonLayout;
