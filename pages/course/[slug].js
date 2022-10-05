import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { currencyFormatter } from "../../utils/helpers";
import { Badge } from "antd";

const SingleCourse = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;

  // destructure course
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="jumbotron bg-primary">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  {/* title, description, category, author, updated at, price */}
                  <h1 className="text-light font-weight-bold">{name}</h1>
                  <div className="lead">
                    {" "}
                    {description && description.substring(0, 160)}...
                  </div>
                  <Badge
                    count={category}
                    style={{ backgroundColor: "#03a9f4" }}
                    className="pb-4 m-2"
                  />
                  <p>
                    {" "}
                    Created by <b>{instructor.name}</b>{" "}
                  </p>
                  <p>
                    {" "}
                    Last updated {new Date(updatedAt).toLocaleDateString()}{" "}
                  </p>
                  <h4 className="text-light">
                    {paid
                      ? currencyFormatter({ amount: price, currency: "bdt" })
                      : "Free"}
                  </h4>
                </div>
                <div className="col-md-4">
                  {/* show video preview or course image */}
                  {/* enroll button  */}
                  <p>this is a button </p>
                </div>
              </div>
            </div>
          </div>
          {/* <pre> {JSON.stringify(course, null, 4)} </pre> */}
        </div>
      </div>
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
