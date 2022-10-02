import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, Tooltip } from "antd";
import InstructorRoute from "../../components/routes/InstructorRoute";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    loadCourses();
  }, []);
  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "14px" };
  return (
    <InstructorRoute>
      <h1 className="jumbotron bg-primary text-center">Instructor Dashboard</h1>

      {courses &&
        courses.map((course) => {
          return (
            <>
              <div className="d-flex pt-3 mt-3 shadow-sm rounded">
                <Avatar
                  size={80}
                  src={course.image ? course.image.Location : "/course.png"}
                />
                <div className="w-100 ps-4">
                  <div className="row">
                    <div className="col">
                      <Link
                        href={`/instructor/course/view/${course.slug}`}
                        className="pointer"
                      >
                        <a className="h5 mt-2 text-primary">{course.name}</a>
                      </Link>
                      <p style={{ marginTop: "-8px" }}>
                        {course.lessons.length} Lessons
                      </p>
                      {course.lessons.length < 5 ? (
                        <p style={myStyle} className="text-warning">
                          At least 5 lessons are required to publish
                        </p>
                      ) : course.published ? (
                        <p style={myStyle} className="text-success">
                          Your course is live in the marketplace
                        </p>
                      ) : (
                        <p style={myStyle} className="text-success">
                          Your course is ready to be published
                        </p>
                      )}
                    </div>
                    <div className="col-md-3 mt-3 text-center">
                      {course.published ? (
                        <Tooltip title={"Published"}>
                          <CheckCircleOutlined className="h5 pointer text-success" />
                        </Tooltip>
                      ) : (
                        <Tooltip title={"Unpublished"}>
                          <CloseCircleOutlined className="h5 pointer text-warning" />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}

      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
    </InstructorRoute>
  );
};

export default InstructorIndex;
