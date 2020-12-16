import { useState } from "react";

import { Flex, Image, Text } from "@chakra-ui/core";
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
import { FiUsers } from "react-icons/fi";
import { FaBorderAll, FaChartBar, FaStickyNote } from "react-icons/fa";
import { useRouter } from "next/router";

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

      <Menu.Item key="worker" icon={<Icon component={FiUsers} />}>
        <Link href="/farm/worker">
          <a>Danh sách nhân công</a>
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
    </Menu>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const account = "business";

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
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
      {/* Should use account type */}
      {account === "farm" ? <FarmSidebar /> : <BusinessSidebar />}
    </Sider>
  );
};

export default CommonLayout;
