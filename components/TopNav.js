import { Menu } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2">
      <Item
        key={"/"}
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreAddOutlined />}
      >
        <Link href={"/"}>
          <a>app</a>
        </Link>
      </Item>
      <Item
        key={"/login"}
        onClick={(e) => setCurrent(e.key)}
        icon={<LoginOutlined />}
      >
        <Link href={"/login"}>
          <a>Login</a>
        </Link>
      </Item>
      <Item
        icon={
          <UserAddOutlined
            key={"/register"}
            onClick={(e) => setCurrent(e.key)}
          />
        }
      >
        <Link href={"/register"}>
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
