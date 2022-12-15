import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import SliderComponent from "../components/extraComponent/SliderComponent";
import PartnerBanner from "../components/extraComponent/partnerBanner";
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
      {/* <h1 className="jumbotron text-center bg-primary">This is arfat</h1> */}
      <SliderComponent />
      <div className="m-auto py-4 my-4" style={{ width: "90%" }}>
        <h3>Explore </h3>
        <div className="row">
          {courses.map((course) => {
            return (
              <div
                className="col-md-4 d-flex align-items-stretch "
                key={course._id}
              >
                <CourseCard course={course} />
                {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
              </div>
            );
          })}
        </div>
      </div>
      <PartnerBanner />
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
