import { Badge, Button } from "antd";
import React from "react";
// import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import Image from "next/image";
import { currencyFormatter } from "../../utils/helpers";
import {
  LoadingOutlined,
  SafetyCertificateFilled,
  SafetyOutlined,
} from "@ant-design/icons";

const SingleCourseJumbotron = ({
  course,
  user,
  loading,
  handleFreeEnrollment,
  handlePaidEnrollment,
  setPreview,
  preview,
  setShowModal,
  showModal,
  setEnrolled,
  enrolled,
}) => {
  // destructure course
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="jumbotron bg-primary">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  {/* title, description, category, author, updated at, price */}
                  <h1 className="text-light font-weight-bold">{name}</h1>
                  <div className="lead">
                    {description && description.substring(0, 160)}...
                  </div>
                  <Badge
                    count={category}
                    style={{ backgroundColor: "#03a9f4" }}
                    className="pb-4 m-2"
                  />
                  <p>
                    Created by <b>{instructor.name}</b>
                  </p>
                  <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
                  <h4 className="text-light">
                    {paid
                      ? currencyFormatter({ amount: price, currency: "usd" })
                      : "Free"}
                  </h4>
                </div>
                <div className="col-md-4">
                  {/* show video preview or course image */}
                  {lessons[0]?.video?.Location ? (
                    <div
                      onClick={() => {
                        setPreview(lessons[0]?.video?.Location);
                        setShowModal(!showModal);
                      }}
                    >
                      <ReactPlayer
                        className="react-player-div"
                        light={image.Location}
                        url={lessons[0]?.video?.Location}
                        width="100%"
                        height={"225px"}
                      />
                    </div>
                  ) : (
                    <>
                      <Image
                        alt={name}
                        className="img img-fluid"
                        src={image?.Location}
                        layout="fixed"
                        width={"100%"}
                        height={"100%"}
                      />
                      {/* <img
                        src={image?.Location}
                        alt={name}
                        className="img img-fluid"
                      /> */}
                    </>
                  )}

                  {/* enroll button  */}
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <LoadingOutlined className="h1 text-danger" />
                    </div>
                  ) : (
                    <Button
                      className="my-3"
                      type="danger"
                      block
                      shape="round"
                      icon={<SafetyOutlined />}
                      size="large"
                      disabled={loading}
                      onClick={
                        paid ? handlePaidEnrollment : handleFreeEnrollment
                      }
                    >
                      {user
                        ? enrolled.status
                          ? "Go to course"
                          : "Enroll"
                        : "Login to enroll"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCourseJumbotron;
