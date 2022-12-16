import { Button, Form, Input, Radio } from "antd";
import React, { useState } from "react";

const MCQAnswer = ({ question }) => {
  const [groupDisable, setGroupDisable] = useState(false);
  const [showAns, setShowAns] = useState(false);
  // console.log(question);

  // const onFinish = (values) => {
  //   console.log("Success:", question.answer);
  //   if (values.toLowerCase() === question.answer) console.log("arfat vai");
  // };

  const selectOptionFun = (e) => {
    console.log("radio checked", e.target.value);
    setShowAns(true);
    setGroupDisable(true);
  };
  return (
    <>
      <Form.Item
        label={
          <p
            style={{ fontSize: "20px" }}
          >{`${question.id}. ${question.question}`}</p>
        }
        name="username"
      >
        <Radio.Group
          name="radiogroup"
          onChange={selectOptionFun}
          disabled={groupDisable}
        >
          {question?.options
            ? question?.options.map((option, i) => (
                <Radio key={i} value={option} style={{ fontSize: 20 }}>
                  {option}
                </Radio>
              ))
            : ""}
        </Radio.Group>
        {showAns ? (
          <>
            <br />
            <b style={{ fontSize: 20 }}>
              Answer :
              <span className="text-success">
                {" "}
                {question.answer.toUpperCase()}
              </span>
            </b>
            <br />
          </>
        ) : (
          ""
        )}
      </Form.Item>
    </>
  );
};

export default MCQAnswer;
