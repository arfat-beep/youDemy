import { Menu } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Item, SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  // context state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

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
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2 mx-md-5">
      <Item
        key={"/"}
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreAddOutlined />}
      >
        <Link href={"/"}>
          <a>app</a>
        </Link>
      </Item>
      {user === null && (
        <>
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
        </>
      )}
      {user !== null && (
        <SubMenu
          style={{ marginLeft: "auto" }}
          icon={<CoffeeOutlined />}
          title={user && user.name}
        >
          <Item
            onClick={logout}
            className="text-center"
            icon={<LogoutOutlined />}
          >
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
