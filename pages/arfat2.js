import axios from "axios";
import React, { useEffect, useState } from "react";
import HigherOrderQuesGenerator from "../components/extraComponent/HigherOrderQuesGenerator";
import MCQGenerator from "../components/extraComponent/MCQGenerator";
import QuizForm from "../components/forms/QuizForm";
const arfat2 = () => {
  const [submitVaule, setSubmitVaule] = useState({});
  const apiUrl = `http://70db-34-138-209-115.ngrok.io`;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <QuizForm setSubmitVaule={setSubmitVaule} />
            {submitVaule.type === "mcq" && (
              <MCQGenerator text={submitVaule.text} url={apiUrl} />
            )}
            {submitVaule.type === "high" && (
              <HigherOrderQuesGenerator text={submitVaule.text} url={apiUrl} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default arfat2;
