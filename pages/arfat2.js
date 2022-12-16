import axios from "axios";
import React, { useEffect, useState } from "react";
import HigherOrderQuesGenerator from "../components/extraComponent/HigherOrderQuesGenerator";
import MCQGenerator from "../components/extraComponent/MCQGenerator";
import QuizForm from "../components/forms/QuizForm";
const arfat2 = () => {
  const [submitVaule, setSubmitVaule] = useState({});

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <QuizForm setSubmitVaule={setSubmitVaule} />
            {submitVaule.type === "mcq" && (
              <MCQGenerator text={submitVaule.text} />
            )}
            {submitVaule.type === "high" && (
              <HigherOrderQuesGenerator text={submitVaule.text} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default arfat2;
