import React from "react";
import { Carousel, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const SliderComponent = () => (
  <Carousel autoplay autoplaySpeed={4000}>
    <div>
      <Link href={"course/html-for-beginners"}>
        <a>
          <Image
            width={"100%"}
            src="https://i.ibb.co/3C3mSzP/slider1.jpg"
            preview={false}
          />
        </a>
      </Link>
    </div>
    <div>
      <Link href={"course/html-for-beginners"}>
        <a>
          <Image
            width={"100%"}
            src="https://i.ibb.co/TW9JHJD/slider2.jpg"
            preview={false}
          />
        </a>
      </Link>
    </div>
  </Carousel>
);
export default SliderComponent;
