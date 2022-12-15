import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import { Context } from "../../context";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState("");
  const [enrolled, setEnrolled] = useState({});

  // state
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && course) checkEnrollment();
  }, [user, course]);
  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-entrollment/${course._id}`);
    // console.log("Check enroll", data);
    setEnrolled(data);
  };

  // router
  const router = useRouter();
  const { slug } = router.query;

  const handlePaidEnrollment = async () => {
    // console.log("paid enrollment");
    try {
      setLoading(true);

      // check if user is logged in or not
      if (!user) router.push("/login");

      //check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);

      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
      console.log("data from paid enrollment ", data);
    } catch (e) {
      toast.error("Entrollment failed. Try again");
      console.log(
        "Error from client/pages/course/slug/handlePaidEnrollment =>",
        e
      );
      setLoading(false);
    }
  };

  const handleFreeEnrollment = async (e) => {
    e.preventDefault();
    try {
      // check if user is logged in or not
      if (!user) router.push("/login");

      //check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);

      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      console.log("freeEnrollment", data);
      setLoading(false);
      toast.success(data.message);
      router.push(`/user/course/${data.course.slug}`);
    } catch (e) {
      toast.error("Enrollment failed");
      console.log("Error from free enrollment", e);
      setLoading(false);
    }
  };

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        user={user}
        loading={loading}
        handleFreeEnrollment={handleFreeEnrollment}
        handlePaidEnrollment={handlePaidEnrollment}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />

      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
      {course?.lessons && (
        <SingleCourseLessons
          lessons={course?.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {/* <pre> {JSON.stringify(course, null, 4)} </pre> */}
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
