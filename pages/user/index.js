import { useContext, useEffect, useState } from "react";
import UserRoutes from "../../components/routes/UserRoutes";
import { Context } from "../../context";
import axios from "axios";
import { PlayCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Link from "next/link";
const UserIndex = () => {
  // context api
  const {
    state: { user },
  } = useContext(Context);

  // state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);
  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user-courses`);
      setCourses(data);
      setLoading(false);
    } catch (e) {
      console.log("Error from loadCourses catch =>", e);
      setLoading(false);
    }
  };

  return (
    <>
      <UserRoutes>
        {loading && (
          <SyncOutlined
            spin
            className="d-flex justify-content display-1 text-danger p-5 shadow-lg"
          />
        )}
        <h1 className="jumbotron text-center">
          {user?.name?.toUpperCase()}'S DASHBOARD
        </h1>

        {/* show courses list  */}
        {courses &&
          courses.map((course) => (
            <div className="d-flex pt-2 pb-1" key={course._id}>
              <Avatar
                size={80}
                shape="square"
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="container ps-2">
                <div className="row">
                  <div className="col">
                    <Link
                      href={`/user/course/${course.slug}`}
                      style={{ cursor: "pointer" }}
                    >
                      <a>
                        <h5 className="mt-2 text-primary">{course.name}</h5>
                      </a>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons.length} lessons
                    </p>
                    <p
                      className="text-muted"
                      style={{ marginTop: "-15px", fontsize: "12px" }}
                    >
                      By {course.instructor.name}
                    </p>
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    <Link href={`/user/course/${course.slug}`}>
                      <a>
                        <PlayCircleOutlined
                          className="h2 text primary"
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* <pre> {JSON.stringify(courses, null, 4)} </pre> */}
      </UserRoutes>
    </>
  );
};

export default UserIndex;
