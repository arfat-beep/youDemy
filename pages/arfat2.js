import axios from "axios";
import React, { useEffect, useState } from "react";
import FAQGenerator from "../components/extraComponent/FAQGenerator";
import HigherOrderQuesGenerator from "../components/extraComponent/HigherOrderQuesGenerator";
import MCQAnswer from "../components/extraComponent/MCQAnswer";
import MCQGenerator from "../components/extraComponent/MCQGenerator";
import QuizForm from "../components/forms/QuizForm";
const arfat2 = () => {
  const [loading, setLoading] = useState(false);
  const [submitVaule, setSubmitVaule] = useState({});
  const apiUrl = `http://5a2e-34-71-52-249.ngrok.io`;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <QuizForm setSubmitVaule={setSubmitVaule} loading={loading} />
            {submitVaule.type === "mcq" && (
              <MCQGenerator
                loading={loading}
                setLoading={setLoading}
                text={submitVaule.text}
                url={apiUrl}
              />
            )}
            {submitVaule.type === "high" && (
              <HigherOrderQuesGenerator
                loading={loading}
                setLoading={setLoading}
                text={submitVaule.text}
                url={apiUrl}
              />
            )}
            {submitVaule.type === "faq" && (
              <FAQGenerator
                loading={loading}
                setLoading={setLoading}
                text={submitVaule.text}
                url={apiUrl}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default arfat2;
