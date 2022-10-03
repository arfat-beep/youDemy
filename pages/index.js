import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
const index = ({ courses }) => {
  // const [courses, setCourses] = useState([]);
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
  //   fetchCourses();
  // }, []);
  return (
    <div>
      <h1 className="jumbotron text-center bg-primary">This is arfat</h1>
      <div className="m-auto" style={{ width: "90%" }}>
        <div className="row">
          {courses.map((course) => {
            return (
              <div className="col-md-4" key={course._id}>
                <CourseCard course={course} />
                {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

export default index;
