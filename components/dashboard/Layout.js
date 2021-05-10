import { useState } from "react";

import { Flex, Image, Text } from "@chakra-ui/react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Header from "./Header";
import Icon from "@ant-design/icons";
import { FiAperture, FiUsers } from "react-icons/fi";
import {
  FaBattleNet,
  FaBorderAll,
  FaChartBar,
  FaSeedling,
  FaStickyNote,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { MdSecurity } from "react-icons/md";

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
            height: "calc(100vh - 64px)",
            overflowY: "scroll",
            padding: "5rem",
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
  } else if (params.length >= 3) {
    key = params[2];
  }

  let predefinedKey = {
    food: "management",
    medicine: "management",
    feedingdiary: "diary",
    usingmedicinediary: "diary",
    feedingchart: "chart",
    product: "product",
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
        <Link href="/farm/pond">
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
        <Menu.Item key="product" icon={<DesktopOutlined />}>
          <Link href="/farm/product">
            <a style={{ fontWeight: "bold" }}> Thu hoạch</a>
          </Link>
        </Menu.Item>
      </SubMenu>

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
        <Menu.Item key="seed" icon={<Icon component={FaSeedling} />}>
          <Link href="/farm/seed">
            <a style={{ fontWeight: "bold" }}> Thả giống</a>
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
    </Menu>
  );
};

const QualityControlSidebar = () => {
  const { route } = useRouter();

  let params = route.split("/");

  let key;
  if (params.length === 2) {
    key = "default";
  } else if (params.length >= 3) {
    key = params[2];
  }

  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={[key]}>
      <Menu.Item key="default" icon={<Icon component={MdSecurity} />}>
        <Link href="/qualitycontrol/authentication">
          <a style={{ fontWeight: "bold" }}>Xác thực</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="register" icon={<Icon component={FaBattleNet} />}>
        <Link href="/qualitycontrol/register">
          <a style={{ fontWeight: "bold" }}>Đăng ký</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="harvest" icon={<Icon component={FiUsers} />}>
        <Link href="/qualitycontrol/harvest">
          <a style={{ fontWeight: "bold" }}>Thu hoạch</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="hatchery" icon={<Icon component={FiUsers} />}>
        <Link href="/qualitycontrol/hatchery">
          <a style={{ fontWeight: "bold" }}>Trại giống</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const AdminSidebar = () => {
  const { route } = useRouter();

  let params = route.split("/");
  let key;
  if (params.length === 2) {
    key = "default";
  } else if (params.length >= 3) {
    key = params[2];
  }

  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={[key]}>
      <Menu.Item key="default" icon={<Icon component={MdSecurity} />}>
        <Link href="/admin">
          <a style={{ fontWeight: "bold" }}>Người dùng</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="posts" icon={<Icon component={FaBattleNet} />}>
        <Link href="/admin/posts">
          <a style={{ fontWeight: "bold" }}>Bài viết</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const Sidebar = () => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(() => {
    return !localStorage.getItem("isCollapsed")
      ? false
      : JSON.parse(localStorage.getItem("isCollapsed"));
  });

  const ISSERVER = typeof window === "undefined";

  let user;

  if (!ISSERVER) {
    user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/signin");
    }
  }

  const onCollapse = (collapsed) => {
    localStorage.setItem("isCollapsed", collapsed);
    setCollapsed(collapsed);
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
        cursor="pointer"
      >
        <Link href="/">
          <a>
            <Image src="/water.svg" height="32px" mr={2} />
          </a>
        </Link>

        <Text
          color="#006aff"
          fontWeight="bold"
          fontSize="20px"
          className="logo--name"
        >
          Trace Origin.
        </Text>
      </Flex>

      {user && user.type === "farm" ? (
        <FarmSidebar />
      ) : user && user.type === "admin" ? (
        <AdminSidebar />
      ) : (
        <QualityControlSidebar />
      )}
    </Sider>
  );
};

export default CommonLayout;
