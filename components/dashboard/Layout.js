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
    product: "product",
    "product-follow": "product",
  };

  return (
    <Menu
      theme="light"
      defaultSelectedKeys={[key]}
      defaultOpenKeys={[predefinedKey[key] ? predefinedKey[key] : null]}
      mode="inline"
    >
      <Menu.Item key="default" icon={<InfoCircleOutlined />}>
        <Link href="/farm">
          <a style={{ fontWeight: "bold" }}>Thông tin</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="ponds" icon={<Icon component={FaBorderAll} />}>
        <Link href="/farm/ponds">
          <a style={{ fontWeight: "bold" }}>Ao</a>
        </Link>
      </Menu.Item>

      <SubMenu
        icon={<Icon component={FiAperture} />}
        key="product"
        title={
          <span>
            <span style={{ fontWeight: "bold" }}>Sản phẩm</span>
          </span>
        }
      >
        <Menu.Item key="product-follow" icon={<DesktopOutlined />}>
          <Link href="/farm/product-follow">
            <a style={{ fontWeight: "bold" }}>Đang theo dõi</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="product" icon={<DesktopOutlined />}>
          <Link href="/farm/product">
            <a style={{ fontWeight: "bold" }}> Đã thu hoạch</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="dairy" icon={<InsertRowBelowOutlined />}>
        <Link href="/farm/diary">
          <a style={{ fontWeight: "bold" }}>Ghi chép </a>
        </Link>
      </Menu.Item>

      <SubMenu
        icon={<PlusCircleOutlined />}
        key="management"
        title={
          <span>
            <span style={{ fontWeight: "bold" }}>Quản lí</span>
          </span>
        }
      >
        <Menu.Item key="food" icon={<DesktopOutlined />}>
          <Link href="/farm/food">
            <a style={{ fontWeight: "bold" }}> Thức ăn</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="medicine" icon={<DesktopOutlined />}>
          <Link href="/farm/medicine">
            <a style={{ fontWeight: "bold" }}> Thuốc</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        icon={<Icon component={FaStickyNote} />}
        key="diary"
        title={
          <span>
            <span style={{ fontWeight: "bold" }}>Nhât ký</span>
          </span>
        }
      >
        <Menu.Item key="feedingdiary" icon={<DesktopOutlined />}>
          <Link href="/farm/feedingdiary">
            <a style={{ fontWeight: "bold" }}> Cho ăn</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="usingmedicinediary" icon={<DesktopOutlined />}>
          <Link href="/farm/usingmedicinediary">
            <a style={{ fontWeight: "bold" }}> Sử dụng thuốc</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        icon={<Icon component={FaChartBar} />}
        key="chart"
        title={
          <span>
            <span style={{ fontWeight: "bold" }}>Biểu đồ</span>
          </span>
        }
      >
        <Menu.Item key="feedingchart" icon={<DesktopOutlined />}>
          <Link href="/farm/feedingchart">
            <a style={{ fontWeight: "bold" }}> Cho ăn</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="worker" icon={<Icon component={FiUsers} />}>
        <Link href="/farm/worker">
          <a style={{ fontWeight: "bold" }}>Nhân công</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="hatchery" icon={<Icon component={FiUsers} />}>
        <Link href="/farm/hatchery">
          <a style={{ fontWeight: "bold" }}>Trại giống</a>
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

  let predefinedKey = {
    register: "product",
    harvest: "product",
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={[key]}
      defaultOpenKeys={[predefinedKey[key] ? predefinedKey[key] : null]}
    >
      <SubMenu
        icon={<Icon component={FaChartBar} />}
        key="product"
        title={
          <span>
            <span>Chờ duyệt</span>
          </span>
        }
      >
        <Menu.Item key="register" icon={<DesktopOutlined />}>
          <Link href="/qualitycontrol/register">
            <a>Đăng ký</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="harvest" icon={<Icon component={FiUsers} />}>
          <Link href="/qualitycontrol/harvest">
            <a>Thu hoạch</a>
          </Link>
        </Menu.Item>
      </SubMenu>
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
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{ background: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,.05)" }}
    >
      <Flex
        dir="row"
        align="center"
        justify="center"
        height="80px"
        w="100%"
        // borderBottom="1px solid #353638"
      >
        <Image src="/water.svg" height="32px" mr={2}></Image>
        <Text
          color="#2196f3"
          fontWeight="bold"
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
        borderRadius="30px"
        background="#1a9cf7"
        padding="10px 20px"
        className="logout__wrapper"
      >
        <Box as={AiOutlineLogout} color="#fff" h="32px" w="32px" />
        <Text color="#fff" ml="10px" className="logout__text">
          Logout
        </Text>
      </Flex>
    </Sider>
  );
};

export default CommonLayout;
