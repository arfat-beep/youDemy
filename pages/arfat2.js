import axios from "axios";
import React, { useEffect, useState } from "react";
import FAQGenerator from "../components/extraComponent/FAQGenerator";
import HigherOrderQuesGenerator from "../components/extraComponent/HigherOrderQuesGenerator";
import MCQGenerator from "../components/extraComponent/MCQGenerator";
import QuizForm from "../components/forms/QuizForm";
const arfat2 = () => {
  const [loading, setLoading] = useState(false);
  const [submitVaule, setSubmitVaule] = useState({});
  const apiUrl = `http://70db-34-138-209-115.ngrok.io`;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
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
