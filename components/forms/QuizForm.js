import React, { useState } from "react";

import { Button, Checkbox, Form, Input, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
const QuizForm = ({ setSubmitVaule }) => {
  const [radioVaule, setRadioVaule] = useState("mcq");
  const onFinish = (values) => {
    setSubmitVaule(values);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Input Text"
          name="text"
          rules={[
            {
              required: true,
              message: "Please input your text!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Please provide your text" />
        </Form.Item>

        <Form.Item
          label="Question type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please select a type!",
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => setRadioVaule(e.target.value)}
            value={radioVaule}
          >
            <Radio value={"mcq"}>MCQ</Radio>
            <Radio value={"faq"}>Faq</Radio>
            <Radio value={"high"}>Higher Order</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default QuizForm;
