import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MCQGenerator = ({ text, url, loading, setLoading }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchFun = async () => {
        let x = [];
        const { data } = await axios.get(`${url}/mcq`, {
          params: { text: text },
        });
        setQuestions(data);
        setLoading(false);
        console.log("from data", data);
      };
      fetchFun();
    } catch (e) {
      console.log("Errro from ", e);
      setLoading(false);
    }
  }, []);
  // console.log("loading value", loading);
  //   console.log("all questions", questions);
  return (
    <>
      <h1>MCQ</h1>
      {loading ? (
        <div className="text-center">
          <LoadingOutlined className="h1 text-danger my-auto" />
        </div>
      ) : (
        <pre>{JSON.stringify(questions, null, 4)}</pre>
      )}
    </>
  );
};

export default MCQGenerator;
