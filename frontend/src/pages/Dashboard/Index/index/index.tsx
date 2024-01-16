import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    BellFilled,
    BellOutlined,
    CloudOutlined,
    HighlightOutlined,
    LogoutOutlined,
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
import { Link, Outlet, useNavigate } from 'react-router-dom';
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
            { label: <Link to={'class-management'}>Quản lí lớp học</Link>, key: 'quan-li-lop-hoc' },
            { label: <Link to={'subject-management'}>Quản lí môn học</Link>, key: 'quan-li-mon-hoc' },
            { label: <Link to={'class-management'}>Quản lí phòng</Link>, key: 'quan-li-phong' },
            { label: <Link to={'class-management'}>Quản lí thời gian</Link>, key: 'quan-li-thoi-gian' },
            { label: <Link to={'class-management'}>Quản lí người dùng</Link>, key: 'quan-li-nguoi-dung' }

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




const App: React.FC = () => {
    const navigate = useNavigate() 
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const items: MenuProps['items'] = [{
        key: 1,
        label: 'Đăng xuất',
        icon: <LogoutOutlined />
        ,
        onClick: () => {
            localStorage.removeItem('access_token')
            navigate('/login')
        }
    }
    ]
    return (
        <Layout hasSider>
            <Sider
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <div className="demo-logo-vertical" style={{background: '#fff'}}>
                    <img src={logo} alt="" style={{ width: '100%' }} />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['quan-li-lop-hoc']} items={menuPM} style={{ fontSize: "16px", fontWeight: 500 }} />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: 0,
                    background: colorBgContainer,
                    display: "flex",
                    position: "fixed",
                    boxShadow: "#e9e9e9 2px 2px 10px",
                    width: '-webkit-fill-available',
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

                <Outlet />
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;