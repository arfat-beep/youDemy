import { Button, Modal } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ApiUrlSubmit from "../components/extraComponent/ApiUrlSubmit";
import FAQGenerator from "../components/extraComponent/FAQGenerator";
import HigherOrderQuesGenerator from "../components/extraComponent/HigherOrderQuesGenerator";
import MCQGenerator from "../components/extraComponent/MCQGenerator";
import QuizForm from "../components/forms/QuizForm";
const questGen = () => {
  const [loading, setLoading] = useState(false);
  const [submitVaule, setSubmitVaule] = useState({});
  const [apiUrl, setApiUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {/* modal for info  */}
          <Modal
            title="Info for best practice"
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => setIsModalOpen(false)}
          >
            To find url
            <Link
              href="https://colab.research.google.com/drive/1wot-PnsVOJTF5wBhyMX7nyerynshOKBD?usp=sharing"
              passHref
            >
              <a
                href="https://colab.research.google.com/drive/1wot-PnsVOJTF5wBhyMX7nyerynshOKBD?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click here.
              </a>
            </Link>
            Then press "run all" in "runtime" options <br />
            After running complete you'll get a link from ngro copy than and
            paste it here
          </Modal>
          {!apiUrl ? (
            <>
              <div className="col-md-7   shadow rounded p-4 mb-5">
                <ApiUrlSubmit
                  apiUrl={apiUrl}
                  setIsModalOpen={setIsModalOpen}
                  setApiUrl={setApiUrl}
                />
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
