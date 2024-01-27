import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Carousel, MenuProps } from "antd";
import { Menu } from "antd";
import slide from "./slide.svg";
import content from "./content.svg";
import image1 from "./image1.svg";
import { Link } from "react-router-dom";
import item1dev2 from './item1_div2.svg'
import item2dev2 from './item2dev2.svg'
import footerSvg from './footer.svg'
import { useSelector } from "react-redux";
import { selectUser } from "@redux/userSlice";
const items: MenuProps["items"] = [
  {
    label: "Trang chủ",
    key: "mail",
  },
  {
    label: "Giới thiệu",
    key: "app",
  },
  {
    label: "Khóa học",
    key: "SubMenu",
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    label: "Liên hệ",
    key: "lien-he",
  },
  {
    label: <Link to={"/login"}>Đăng nhập</Link>,
    key: "login",
  },
  {
    label: (
      <>
        <Button size={"large"}>Đăng ký</Button>
      </>
    ),
    key: "dang-ky",
  },
];

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "600px",
  textAlign: "center",
  background: "#364d79",
};

const Home: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const user = useSelector(selectUser);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div >
      <Menu
        style={{ fontSize: 20, fontWeight: 500, justifyContent: "flex-end" }}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />

      <Carousel style={{ height: 600, marginTop: 20 }}>
        <div style={contentStyle}>
          <img src={slide} alt="" width={"100%"} />
        </div>
      </Carousel>
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img src={content} alt="" />
        <img src={image1} alt="" />
      </div>

      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img src={item1dev2} alt="" />
        <img src={item2dev2} alt="" />
      </div>
      <footer>
        <img  style={{width: '100%', marginTop: 40}} src={footerSvg} alt=""  />
      </footer>
    </div>
  );
};

export default Home;
