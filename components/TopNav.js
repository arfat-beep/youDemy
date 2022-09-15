import { Menu } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);

  const router = useRouter();
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    setCurrent("/login");
    router.push("/login");
  };

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
      <Item icon={<UserAddOutlined />} key={"/register"}>
        <Link href={"/register"}>
          <a>Register</a>
        </Link>
      </Item>
      <Item onClick={logout} className="float-end" icon={<LogoutOutlined />}>
        Logout
      </Item>
    </Menu>
  );
};

export default TopNav;
