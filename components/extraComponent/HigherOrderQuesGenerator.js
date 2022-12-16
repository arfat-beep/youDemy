import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HigherOrderQuesAnswer from "./HigherOrderQuesAnswer";

const HigherOrderQuesGenerator = ({ text, url, loading, setLoading }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchFun = async () => {
        let x = [];
        const { data } = await axios
          .get(`${url}/high`, {
            params: { text: text },
          })
          .catch((e) => {
            alert("Data error please try again");
            setLoading(false);
            return e;
          });
        setQuestions(data);
        setLoading(false);
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
      <h1 className="text-center">Higher order</h1>
      {loading ? (
        <div className="text-center">
          <LoadingOutlined className="h1 text-danger my-auto" />
        </div>
      ) : (
        <>
          <div className="container">
            <div className="row">
              {questions[0]
                ? questions.map((question, i) => (
                    <HigherOrderQuesAnswer key={i} question={question} />
                  ))
                : ""}
            </div>
          </div>
          {/* <pre>{JSON.stringify(questions, null, 4)}</pre> */}
        </>
      )}
    </>
  );
};

export default HigherOrderQuesGenerator;
