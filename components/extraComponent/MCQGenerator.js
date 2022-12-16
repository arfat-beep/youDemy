import axios from "axios";
import React, { useEffect, useState } from "react";

const MCQGenerator = ({ text }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      const fetchFun = async () => {
        let x = [];
        const { data } = await axios.get(
          "http://4008-34-138-209-115.ngrok.io/mcq",
          {
            params: { text: text },
          }
        );
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
