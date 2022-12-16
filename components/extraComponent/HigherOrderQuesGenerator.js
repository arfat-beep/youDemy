import axios from "axios";
import React, { useEffect, useState } from "react";

const HigherOrderQuesGenerator = ({ text, url }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    try {
      const fetchFun = async () => {
        let x = [];
        const { data } = await axios.get(`${url}/high`, {
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
  console.log(questions);
  return <>{questions[0] && <pre>{JSON.stringify(questions, null, 4)}</pre>}</>;
};

export default HigherOrderQuesGenerator;
