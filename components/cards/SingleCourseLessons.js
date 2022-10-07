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
                  />
                  {item.video && item.video !== null && item.free_preview && (
                    <span
                      onClick={() => {
                        setPreview(item?.video?.Location);
                        setShowModal(!showModal);
                        console.log("arfat");
                      }}
                      style={{ cursor: "pointer" }}
                      className="text-primary"
                    >
                      Preview
                    </span>
                  )}
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
