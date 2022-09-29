import axios from "axios";
import { useRouter } from "next/router";
import { Avatar, Tooltip } from "antd";
import { useEffect, useState } from "react";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
const CourseView = () => {
  const [course, setCourse] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };
  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {course && (
          <div className="contaienr-fluid pt-1">
            <div className="d-flex pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="w-100 ms-3">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary"> {course.name} </h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>
                  <div className="col-3">
                    <div className="d-flex pt-4 justify-content-center">
                      <Tooltip title="Edit">
                        <EditOutlined className="h5 poiner text-warning me-4" />
                      </Tooltip>
                      <Tooltip title="Publish">
                        <CheckOutlined className="h5 poiner text-danger" />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                {" "}
                <ReactMarkdown children={course.description} />{" "}
              </div>
            </div>
          </div>
        )}
        {/* <pre> {JSON.stringify(course, null, 4)} </pre> */}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
