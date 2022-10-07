import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");

  const router = useRouter();
  const { slug } = router.query;

  // destructure course

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
      />
      {/* {
        showModal ? course.lessons[0].video.Location : 
      } */}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
