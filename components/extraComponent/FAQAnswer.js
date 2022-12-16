import React from "react";

const FAQAnswer = ({ question }) => {
  //   console.log(question);
  return (
    <>
      <div className="col-12">
        <h5>{`${question.id}.  ${question.question}`}</h5>
        <div className="container">
          <p className="text-success">{question.answer}</p>
        </div>
      </div>
    </>
  );
};

export default FAQAnswer;
