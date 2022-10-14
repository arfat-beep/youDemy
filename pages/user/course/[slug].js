import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
const SingleCourse = () => {
  const [lodaing, setLodaing] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);
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
  return (
    <StudentRoute>
      <pre> {JSON.stringify(course, null, 4)} </pre>
    </StudentRoute>
  );
};

export default SingleCourse;
