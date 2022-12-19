import { Button, Form, Input, message } from "antd";
import React from "react";

const ApiUrlSubmit = ({ setApiUrl, apiUrl }) => {
  console.log(apiUrl);
  const [form] = Form.useForm();
  const onFinish = ({ url }) => {
    setApiUrl(url);
    // console.log(url);
    message.success("Submit success!");
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="url"
        label="URL"
        rules={[
          {
            required: true,
          },
          {
            type: "url",
            warningOnly: true,
          },
          {
            type: "string",
            min: 6,
          },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit url
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ApiUrlSubmit;
