import { useState } from "react";

import { Flex, Image, Text } from "@chakra-ui/core";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  BorderVerticleOutlined,
  InfoCircleOutlined,
  InsertRowBelowOutlined,
  PlusCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Header from "./Header";
import Icon from "@ant-design/icons";
import { BiNote } from "react-icons/bi";
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
  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1" icon={<InfoCircleOutlined />}>
        <Link href="/farm">
          <a>Thông tin</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<Icon component={FaBorderAll} />}>
        <Link href="/farm/ponds">
          <a>Ao</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="3" icon={<InsertRowBelowOutlined />}>
        <Link href="/farm/diary">
          <a>Nhật ký hằng ngày </a>
        </Link>
      </Menu.Item>

      <SubMenu
        icon={<PlusCircleOutlined />}
        key="4"
        title={
          <span>
            <span>Quản lí</span>
          </span>
        }
      >
        <Menu.Item key="5" icon={<DesktopOutlined />}>
          <Link href="/farm/food">
            <a> Thức ăn</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<DesktopOutlined />}>
          <Link href="/farm/medicine">
            <a> Thuốc</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        icon={<Icon component={FaStickyNote} />}
        key="7"
        title={
          <span>
            <span>Nhât ký</span>
          </span>
        }
      >
        <Menu.Item key="8" icon={<DesktopOutlined />}>
          <Link href="/farm/feedingdiary">
            <a> Cho ăn</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<DesktopOutlined />}>
          <Link href="/farm/usingmedicinediary">
            <a> Sử dụng thuốc</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu
        icon={<Icon component={FaChartBar} />}
        key="10"
        title={
          <span>
            <span>Biểu đồ</span>
          </span>
        }
      >
        <Menu.Item key="11" icon={<DesktopOutlined />}>
          <Link href="/farm/feedingchart">
            <a> Cho ăn</a>
          </Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="12" icon={<Icon component={FiUsers} />}>
        <Link href="/farm/worker">
          <a>Danh sách nhân công</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const BusinessSidebar = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1" icon={<InfoCircleOutlined />}>
        <Link href="/farm">
          <a>Thông tin</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const Sidebar = () => {
  const router = useRouter();
  console.log(router);
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
      {router.route === "/farm" ? <FarmSidebar /> : <BusinessSidebar />}
    </Sider>
  );
};

export default CommonLayout;
