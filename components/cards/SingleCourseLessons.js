import { Avatar, List } from "antd";
import React from "react";

const { Item } = List;
const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col lesson-list">
            {lessons && <h4>{lessons.length} Lessons </h4>}
            <hr />
            <List
              itemLayout="horizontal"
              dataSource={lessons}
              renderItem={(item, index) => (
                <Item>
                  <Item.Meta
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                  ></Item.Meta>
                </Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCourseLessons;
