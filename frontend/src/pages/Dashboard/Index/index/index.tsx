import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    BellFilled,
    BellOutlined,
    CloudOutlined,
    HighlightOutlined,
    ScheduleOutlined,
    SettingFilled,
    SettingOutlined,
    ShopOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import logo from '@access/logo.svg'
import { Link, Outlet } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const menuTeacher: ItemType<MenuItemType>[] = [
    {
        key: "lich-day",
        label: "Lịch dạy",
        icon: <ScheduleOutlined />

    },
    {
        key: "dang-ky",
        label: 'Đăng ký',
        icon: <HighlightOutlined />
    },
    {
        key: 'hoc-vien',
        label: 'Học viên',
        icon: <TeamOutlined />
    },
    {
        key: 'thong-bao',
        icon: <BellFilled />,
        label: "Thông báo",
    },
    {
        key: 'quang-ly-ca-nhan',
        label: 'Quảng lý cá nhân',
        icon: <UserOutlined />
    },
    { key: 'cai-dat', label: 'Cài đặt', icon: <SettingFilled /> }
]
const menuPM: ItemType<MenuItemType>[] = [
    {
        key: "quan-li-chung",
        label: "Quản lí chung",
        icon: <UnorderedListOutlined />,
        children: [
            { label: <Link to={'class-management'}>Quản lí lớp học</Link>, key: 'quan-li-lop-hoc' }
        ]
    },
    {
        key: "dang-ky",
        label: 'Đăng ký',
        icon: <HighlightOutlined />
    },
    {
        key: 'hoc-vien',
        label: 'Học viên',
        icon: <TeamOutlined />
    },
    {
        key: 'thong-bao',
        icon: <BellFilled />,
        label: "Thông báo",
    },
    {
        key: 'quang-ly-ca-nhan',
        label: 'Quảng lý cá nhân',
        icon: <UserOutlined />
    },
    { key: 'cai-dat', label: 'Cài đặt', icon: <SettingFilled /> }
]


const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <div className="demo-logo-vertical">
                    <img src={logo} alt="" style={{ width: '100%' }} />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['thong-bao']} items={menuPM} style={{ fontSize: "16px", fontWeight: 500 }} />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{
                    padding: 0,
                    background: colorBgContainer,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "fixed",
                    boxShadow: "#e9e9e9 2px 2px 10px",
                    width: '-webkit-fill-available',
                    justifyItems: "flex-end",
                    zIndex: 2
                }} >
                    <Dropdown menu={{ items }}>
                        <Avatar
                            style={{ marginRight: "30px" }}
                            src={'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*'
                            }
                            size={"large"}
                        />
                    </Dropdown>
                </Header>
                <Breadcrumb style={{ margin: '24px 16px 0', paddingTop: '60px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                {/* <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <p>long content</p>
                        {
                            // indicates very long content
                            Array.from({ length: 100 }, (_, index) => (
                                <React.Fragment key={index}>
                                    {index % 20 === 0 && index ? 'more' : '...'}
                                    <br />
                                </React.Fragment>
                            ))
                        }
                    </div>
                </Content> */}
                <Outlet />
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;