import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  BellFilled,
  BellOutlined,
  CloudOutlined,
  FormOutlined,
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
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import logo from "@access/snapedit_1705690457169.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/userSlice";
import { UserRoleEnum } from "@utils/constants";
const { Header, Content, Footer, Sider } = Layout;
const menuTeacher: ItemType<MenuItemType>[] = [
  {
    key: "lich-day",
    label: "Lịch dạy",
    icon: <ScheduleOutlined />,
    children: [
      {
        label: <Link to="dang-ky-lich-day">Đăng ký lịch dạy</Link>,
        key: "dang-ky-lich-day",
      },
      {
        label: <Link to={"lich-day-ca-nhan"}>Xem lịch dạy</Link>,
        key: "lich-day-ca-nhan",
      },
      {
        label: <Link to="lich-day-cac-giao-vien">Xem lịch dạy GV</Link>,
        key: "lich-day-cac-giao-vien",
      },
    ],
  },
  {
    key: "dang-ky",
    label: "Đăng ký",
    icon: <HighlightOutlined />,
  },
  {
    key: "hoc-vien",
    label: "Học viên",
    icon: <TeamOutlined />,
  },
  {
    key: "thong-bao",
    icon: <BellFilled />,
    label: <Link to="thong-bao-giao-vien">Thông báo</Link>,
  },
  {
    key: "thong-tin-ca-nhan",
    label: <Link to='thong-tin-ca-nhan'> Thông tin cá nhân</Link>,
    icon: <UserOutlined />,
  },
  { key: "cai-dat", label: "Cài đặt", icon: <SettingFilled /> },
];

const menuPM: ItemType<MenuItemType>[] = [
  {
    key: "quan-li-chung",
    label: "Chung",
    icon: <UnorderedListOutlined />,
    children: [
      {
        label: <Link to={"class-management"}>Cập nhật lớp học</Link>,
        key: "quan-li-lop-hoc",
      },
      {
        label: <Link to={"subject-management"}>Cập nhật môn học</Link>,
        key: "quan-li-mon-hoc",
      },
      {
        label: <Link to={"room-management"}>Cập nhật phòng</Link>,
        key: "quan-li-phong",
      },

      /*{
        label: <Link to={"class-management"}>Phân quyền</Link>,
        key: "quan-li-nguoi-dung",
      },*/
      {
        label: <Link to={"class-management"}>Tạo lịch dạy</Link>,
        key: "tao-lich-day",
      },
    ],
  },
  {
    key: "dang-ky",
    label: "Đăng ký",
    icon: <HighlightOutlined />,
  },
  {
    key: "phe-duyet",
    label: "Phê duyệt",
    icon: <FormOutlined />,
    children: [
      {
        key: "duyet-dang-ky",
        label: <Link to={"sign-management"}>Duyệt Đăng ký</Link>,
        // icon : <FormOutlined />
      },
      {
        key: 'duyet-dang-ky-hoc-sinh',
        label: <Link to={'duyet-dang-ky-hoc-sinh'}>Duyệt đăng ký học</Link>
      }
    ],
  },
  {
    key: "quan-ly-giao-vien",
    label: <Link to={"quan-ly-giao-vien"}>Giáo viên</Link>,
    icon: <BookOutlined />,
  },
  {
    key: "hoc-vien",
    label: <Link to={"quan-ly-hoc-sinh"}>Học viên</Link>,
    icon: <TeamOutlined />,
  },
  {
    key: "thong-bao",
    icon: <BellFilled />,
    label: "Thông báo",
  },
  {
    key: "quan-ly-ca-nhan",
    label: "Thông tin cá nhân",
    icon: <UserOutlined />,
  },
  { key: "cai-dat", label: "Cài đặt", icon: <SettingFilled /> },
];
const menuStudent: ItemType<MenuItemType>[] = [
  {
    key: "thoi-khoa-bieu",
    label: <Link to={"/hoc-sinh/lich-hoc"}>Thời kháo biểu</Link>,
    icon: <CalendarOutlined />,
  },
  {
    key: "hoc-sinh/dang-ky-lich-hoc",
    label: <Link to={"/hoc-sinh/dang-ky-lich-hoc"}>Đăng ký lịch</Link>,
    icon: <HighlightOutlined />,
  },
];
const App: React.FC = () => {
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("access_token");
        navigate("/login");
      },
    },
  ];
  console.log(user, user?.user?.roles[0].name);
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            background: "#fff",
            display: "flex",
            justifyItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img src={logo} alt="" style={{ width: "80%" }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["quan-li-lop-hoc"]}
          items={
            user?.user?.roles[0].name == UserRoleEnum.PM
              ? menuPM
              : user?.user?.roles[0].name === UserRoleEnum.STUDENT
                ? menuStudent
                : menuTeacher
          }
        // style={{ fontSize: "16px", fontWeight: 500 }}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            position: "fixed",
            boxShadow: "#e9e9e9 2px 2px 10px",
            width: "-webkit-fill-available",
            zIndex: 2,
          }}
        >
          <>
            <span style={{ marginRight: "20px" }}>
              {user?.user?.fullName || ""}
            </span>
          </>{" "}
          {user && (
            <Dropdown menu={{ items }}>
              <Avatar
                style={{ marginRight: "30px" }}
                src={
                  "https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*"
                }
                size={"large"}
              />
            </Dropdown>
          )}
        </Header>
        <Breadcrumb style={{ margin: "24px 16px 0", paddingTop: "60px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <Outlet />
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
