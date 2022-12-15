import {
  FacebookFilled,
  LinkedinFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
const { Item, SubMenu, ItemGroup } = Menu;
import React, { useState } from "react";

const Footer = () => {
  const [current, setCurrent] = useState("");
  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-4">
            <h5>Menu</h5>
            <Menu mode="vertical" selectedKeys={[current]} className="">
              <Item key={"/"} onClick={(e) => setCurrent(e.key)}>
                <Link href={"/"}>
                  <a>Home</a>
                </Link>
              </Item>
              <Item key={"/courses"} onClick={(e) => setCurrent(e.key)}>
                <Link href={"/courses"}>
                  <a>Courses</a>
                </Link>
              </Item>
              <Item key={"/about"} onClick={(e) => setCurrent(e.key)}>
                <Link href={"/about"}>
                  <a>About US</a>
                </Link>
              </Item>
            </Menu>
          </div>
          <div className="col-md-4">
            <h5>Links</h5>

            <Menu>
              <Item>
                <Link href={"/blogs"}>
                  <a>News & Blogs</a>
                </Link>
              </Item>
              <Item>
                <Link href={"/library"}>
                  <a>Library</a>
                </Link>
              </Item>
              <Item>
                <Link href={"/gallery"}>
                  <a>Gallery</a>
                </Link>
              </Item>
            </Menu>
          </div>
          <div className="col-md-4 text-center">
            <h5>
              <a className="text-black" href="/">
                youDemy
              </a>
            </h5>
            {/* social links  */}
            <div className="row gx-1 h3">
              <div className="col">
                <a
                  style={{
                    color: " #3b5998 ",
                  }}
                  href="https://www.facebook.com/arfat.xyz"
                >
                  <FacebookFilled />
                </a>
              </div>
              <div className="col">
                {" "}
                <a
                  style={{
                    color: " #0072b1 ",
                  }}
                  href="https://www.linkedin.com/in/arfatxyz/"
                >
                  <LinkedinFilled />
                </a>
              </div>
              <div className="col">
                <a
                  style={{
                    color: "#FF0000",
                  }}
                  href="https://www.youtube.com/channel/UCmOSI255SIeyhX9spzeGw2g"
                >
                  <YoutubeFilled />
                </a>
              </div>
            </div>
            {/* Copyright */}
            <p>
              © {new Date().getFullYear()} youDemy Made by{" "}
              <a
                href="https://github.com/arfat-xyz?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arfatur Rahman
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
