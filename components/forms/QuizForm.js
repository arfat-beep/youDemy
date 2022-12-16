import React, { useState } from "react";

import { Button, Checkbox, Form, Input, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
const QuizForm = ({ setSubmitVaule, loading }) => {
  const [radioVaule, setRadioVaule] = useState("mcq");
  const [textAreaValue, setTextAreaValue] = useState("vaasdlfk");

  const [form] = Form.useForm();
  const onFinish = (values) => {
    setSubmitVaule(values);
    form.resetFields();
  };
  return (
    <>
      <Form
        disabled={loading}
        name="basic"
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
            {
              type: "string",
              min: 50,
              message: "Minimum length is 50.",
            },
            // {
            //   max: 1000,
            //   message: "Maximum length is 1000",
            // },
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
          <Radio.Group onChange={(e) => setRadioVaule(e.target.value)}>
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
