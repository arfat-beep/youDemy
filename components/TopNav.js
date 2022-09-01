import { Menu } from "antd";
import Link from "next/link";
import React from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
const { Item } = Menu;
const TopNav = () => {
  return (
    <Menu mode="horizontal">
      <Item icon={<AppstoreAddOutlined />}>
        <Link href={"/"}>
          <a>app</a>
        </Link>
      </Item>
      <Item icon={<LoginOutlined />}>
        <Link href={"/login"}>
          <a>Login</a>
        </Link>
      </Item>
      <Item icon={<UserAddOutlined />}>
        <Link href={"/register"}>
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
