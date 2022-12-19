import axios from "axios";
import React, { useEffect, useState } from "react";
import ApiUrlSubmit from "../components/extraComponent/ApiUrlSubmit";
import FAQGenerator from "../components/extraComponent/FAQGenerator";
import HigherOrderQuesGenerator from "../components/extraComponent/HigherOrderQuesGenerator";
import MCQAnswer from "../components/extraComponent/MCQAnswer";
import MCQGenerator from "../components/extraComponent/MCQGenerator";
import QuizForm from "../components/forms/QuizForm";
const questGen = () => {
  const [loading, setLoading] = useState(false);
  const [submitVaule, setSubmitVaule] = useState({});
  const [apiUrl, setApiUrl] = useState("");
  // const apiUrl = `http://e54f-34-71-52-249.ngrok.io`;

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {!apiUrl ? (
            <>
              <div className="col-md-7   shadow rounded p-4 mb-5">
                <ApiUrlSubmit apiUrl={apiUrl} setApiUrl={setApiUrl} />
              </div>
            </>
          ) : (
            <>
              <div className="col-md-7  shadow rounded p-4">
                <div className="text-center">
                  <h1>Generate Questions</h1>
                  <small className="text-danger">
                    Please use paragraph type content for more question
                  </small>
                </div>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default questGen;
