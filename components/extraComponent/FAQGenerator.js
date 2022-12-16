import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FAQGenerator = ({ text, url, loading, setLoading }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchFun = async () => {
        let x = [];
        const { data } = await axios.get(`${url}/high`, {
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
  console.log(questions);
  return (
    <>
      <h1>faq</h1>
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

export default FAQGenerator;
