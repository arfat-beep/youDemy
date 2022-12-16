import { LoadingOutlined } from "@ant-design/icons";
import { Form } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MCQAnswer from "./MCQAnswer";

const MCQGenerator = ({ text, url, loading, setLoading }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchFun = async () => {
        let x = [];
        const { data } = await axios
          .get(`${url}/mcq`, {
            params: { text: text },
          })
          .catch((e) => {
            alert("Data error please try again");
            setLoading(false);
            return e;
          });
        setQuestions(data);
        setLoading(false);
        console.log("from data", data);
      };
      fetchFun();
    } catch (e) {
      setLoading(false);
      console.log("Errro from ", e);
    }
  }, []);
  // console.log("loading value", loading);
  //   console.log("all questions", questions);
  return (
    <>
      <h1 className="text-center">MCQ</h1>
      {loading ? (
        <div className="text-center">
          <LoadingOutlined className="h1 text-danger my-auto" />
        </div>
      ) : (
        <>
          {questions[0] ? (
            <>
              {" "}
              <Form
                name="basic"
                // onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                {questions.map((question) => (
                  <MCQAnswer question={question} />
                ))}
              </Form>
            </>
          ) : (
            ""
          )}

          <pre>{JSON.stringify(questions, null, 4)}</pre>
        </>
      )}
    </>
  );
};

export default MCQGenerator;
