import React, { createElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Avatar, Button, Menu } from "antd";
import dynamic from "next/dynamic";
import style from "../../../styles/index.module.css";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import ReactMarkdown from "react-markdown";
import {
  CheckCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusCircleFilled,
  PlayCircleOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import myFont from "../../../public/Courgette-Regular-normal";
import { Context } from "../../../context";
const { Item } = Menu;
const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [lodaing, setLodaing] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  // force to update state
  const [updateState, setUpdateState] = useState(false);

  // context state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    // console.log("Completed Lesson =>", data);
    setCompletedLessons(data);
  };

  const loadCourse = async () => {
    try {
      setLodaing(true);
      const { data } = await axios.get(`/api/user/course/${slug}`);
      setCourse(data);
    } catch (e) {
      console.log("Erorr from single course loadCourse =>", e);
      setLodaing(false);
    }
  };

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };
  const markincompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      const all = completedLessons;
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (e) {
      console.log("Error from mark as imcompleted", e);
    }
  };

  // donwload Certificate
  const downloadCertificate = () => {
    const doc = new jsPDF("landscape", "px", "a4", false);

    doc.addImage("/certificate.png", "png", 65, 20, 500, 400);

    // fonts
    doc.addFileToVFS("MyFont.ttf", myFont);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    // doc.setFont("Courgette-Regular", "normal");
    doc.setFontSize(50);
    doc.text(user.name, 150, 260);

    doc.setFont("courier", "normal");
    doc.setFontSize(20);
    doc.text("for his achievements of completing ", 150, 290);
    doc.text(`in the 2022 ${course.name}`, 150, 310);
    doc.text(" course activities", 150, 330);
    console.log(course);
    doc.save(`${user.name}.pdf`);
  };

  // console.log(completedLessons.length, course.lessons.length);
  return (
    <StudentRoute>
      <div className="row">
        <div style={{ maxWidth: 320 }}>
          <div className={`gap-2 ${collapsed ? "" : "d-grid"}`}>
            <Button
              onClick={() => setCollapsed(!collapsed)}
              className="btn text-primary mt-1  mb-2"
            >
              {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              {!collapsed && "lessons"}
            </Button>
          </div>

          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: "80vh", overflow: "scroll" }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
              >
                {/* {lesson.title.substring(0, 20)} */}
                {lesson?.title.length > 25
                  ? `${lesson.title.substring(0, 25)}...`
                  : lesson.title}
                {completedLessons.includes(lesson._id) ? (
                  <CheckCircleFilled
                    className="ms-2 float-end text-primary"
                    style={{
                      marginTop: 13,
                    }}
                  />
                ) : (
                  <MinusCircleFilled
                    className="ms-2 float-end text-danger"
                    style={{
                      marginTop: 13,
                    }}
                  />
                )}
              </Item>
            ))}

            {completedLessons.length === course.lessons.length ? (
              <Button
                onClick={() => downloadCertificate()}
                className="btn text-primary mt-1  w-100 mb-2"
              >
                Download Certificate
              </Button>
            ) : (
              ""
            )}
          </Menu>
        </div>
        <div className="col">
          {clicked !== -1 ? (
            <>
              <div className="col alert alert-primary rounded">
                <b> {course.lessons[clicked].title.substring(0, 30)} </b>

                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <span className="float-end pointer" onClick={markincompleted}>
                    Mark as incomplete
                  </span>
                ) : (
                  <span className="float-end pointer" onClick={markCompleted}>
                    Mark as Completed
                  </span>
                )}
              </div>

              {course.lessons[clicked].video &&
                course.lessons[clicked].video?.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player"
                        url={course.lessons[clicked].video?.Location}
                        width="100%"
                        height="100%"
                        controls
                        onEnded={markCompleted}
                      />
                    </div>
                    {/* <pre>
                      {JSON.stringify(course.lessons[clicked], null, 4)}
                    </pre> */}
                  </>
                )}
              <ReactMarkdown
                children={course.lessons[clicked].content}
                className="single-post"
              />
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary display-1 p-5" />
                <p className="lead">Click on the lessons to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <pre> {JSON.stringify(course, null, 4)} </pre> */}
    </StudentRoute>
  );
};

export default SingleCourse;
