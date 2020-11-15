import { useState } from "react";

import { Flex, Image, Text } from "@chakra-ui/core";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  BorderVerticleOutlined,
  InfoCircleOutlined,
  FileOutlined,
  InsertRowBelowOutlined,
  PlusCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Header from "./Header";

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

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

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
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<InfoCircleOutlined />}>
          <Link href="/dashboard">
            <a>Thông tin</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BorderVerticleOutlined />}>
          <Link href="/dashboard/ponds">
            <a>Ao</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileOutlined />}>
          <Link href="/dashboard/notes">
            <a>Ghi chú</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<InsertRowBelowOutlined />}>
          <Link href="/dashboard/diary">
            <a>Nhật ký hằng ngày </a>
          </Link>
        </Menu.Item>

        <SubMenu
          icon={<PlusCircleOutlined />}
          key="5"
          title={
            <span>
              <span>Thêm</span>
            </span>
          }
        >
          <Menu.Item key="6" icon={<DesktopOutlined />}>
            <Link href="/dashboard/addfood">
              <a> Nhập thức ăn</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<DesktopOutlined />}>
            <Link href="/dashboard/addfood">
              <a> Nhập thuốc</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          icon={<DesktopOutlined />}
          key="8"
          title={
            <span>
              <span>Biểu đồ</span>
            </span>
          }
        >
          <Menu.Item key="9" icon={<DesktopOutlined />}>
            <Link href="/dashboard/feedingchart">
              <a> Cho ăn</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="10" icon={<DesktopOutlined />}>
          <Link href="/dashboard/food">
            <a> Thức ăn</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<DesktopOutlined />}>
          <Link href="/dashboard/food">
            <a> Thuốc</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="12" icon={<DesktopOutlined />}>
          <Link href="/dashboard/food">
            <a> Cho ăn</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default CommonLayout;
