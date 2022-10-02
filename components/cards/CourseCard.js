import React from "react";
import { Badge, Card } from "antd";
import Link from "next/link";
const { Meta } = Card;
const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;

  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className=" shadow-sm rounded  mb-4"
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{ height: 200, objectFit: "cover" }}
            />
          }
        >
          <h2 className="font-weight-bold">{name}</h2>
          <p>by {instructor.name}</p>
          <Badge count={category} className="pb-2 me-2" />
          <h4 className="pt-2">{paid ? price : "free"}</h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
