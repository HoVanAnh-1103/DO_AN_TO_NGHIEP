import React, { useState } from "react";
import {
  AppstoreOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Carousel, Dropdown, MenuProps } from "antd";
import { Menu } from "antd";
import logo from "@access/snapedit_1705690457169.png";
import { Link, Outlet, useNavigate } from "react-router-dom";

import footerSvg from "../User/Home/footer.svg";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/userSlice";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "600px",
  textAlign: "center",
  background: "#364d79",
};

const HomeStudent: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: "Trang chủ",
      key: "mail",
    },
    {
      label: "Giới thiệu",
      key: "info",
    },
    {
      label: "Lịch học",
      key: "schedule",
      onClick: () => {
        navigate("/hoc-sinh/lich-hoc");
      },
    },
    {
      label: "Khóa học",
      key: "SubMenu",
      onClick: () => {
        navigate("/hoc-sinh/dang-ky-lich-hoc");
      },
    },
    {
      label: "Liên hệ",
      key: "lien-he",
    },
    ...(!user?.user
      ? [
          {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: "login",
          },
        ]
      : []),
    {
      label: user && (
        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: "Đăng xuất",
                icon: <LogoutOutlined />,
                onClick: () => {
                  localStorage.removeItem("access_token");
                  navigate("/login");
                },
              },
            ],
          }}
        >
          <Avatar
            style={{ marginRight: "30px" }}
            src={
              "https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*"
            }
            size={"large"}
          />
        </Dropdown>
      ),
      key: "dang-ky",
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={logo} alt="" width={90} />{" "}
        <Menu
          style={{ fontSize: 20, fontWeight: 500, justifyContent: "flex-end" }}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>

      <Outlet />

      <footer>
        <img style={{ width: "100%", marginTop: 40 }} src={footerSvg} alt="" />
      </footer>
    </div>
  );
};

export default HomeStudent;
