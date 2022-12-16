import axios from "axios";
import React, { useEffect, useState } from "react";

const MCQGenerator = ({ text, url }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      const fetchFun = async () => {
        let x = [];
        const { data } = await axios.get(`${url}/mcq`, {
          params: { text: text },
        });
        setQuestions(data);
        console.log("from data", data);
      };
      fetchFun();
    } catch (e) {
      console.log("Errro from ", e);
    }
  }, []);
  //   console.log("all questions", questions);
  return (
    <>
      {questions[0] && "araft"}
      {questions[0] && <pre>{JSON.stringify(questions, null, 4)}</pre>}
    </>
  );
};

export default MCQGenerator;
