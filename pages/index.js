import React, { useEffect, useState } from "react";
import axios from "axios";
const index = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    };
    fetchCourses();
  }, []);
  console.log(courses);
  return (
    <div>
      <h1 className="jumbotron text-center bg-primary">This is arfat</h1>
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => {
            return (
              <div className="col-md-4" key={course._id}>
                <pre>{JSON.stringify(course, null, 4)}</pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default index;
