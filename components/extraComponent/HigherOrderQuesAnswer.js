import React from "react";

const HigherOrderQuesAnswer = ({ question }) => {
  console.log(question);
  return (
    <>
      <div className="col-12">
        <h5>{`${question.id}.  ${question.question}`}</h5>
        <div className="container">
          <p className="text-success">{question.context}</p>
        </div>
      </div>
    </>
  );
};

export default HigherOrderQuesAnswer;
