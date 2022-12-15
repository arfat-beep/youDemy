import axios from "axios";
import React, { useEffect, useState } from "react";
import QuizForm from "../components/forms/QuizForm";
const arfat2 = () => {
  const [a, setA] = useState(null);
  const [submitVaule, setSubmitVaule] = useState({});
  const textObj = {
    text: `Elon Musk has shown again he can influence the digital currency market with just his tweets. After saying that his electric vehicle-making company Tesla will not accept payments in Bitcoin because of environmental concerns, he tweeted that he was working with developers of Dogecoin to improve system transaction efficiency. 

Following the two distinct statements from him, the world's largest cryptocurrency hit a two-month low, while Dogecoin rallied by about 20 percent. The SpaceX CEO has in recent months often tweeted in support of Dogecoin, but rarely for Bitcoin.  In a recent tweet, Musk put out a statement from Tesla that it was concerned about the rapidly increasing use of fossil fuels for Bitcoin (price in India) mining and transaction, and hence was suspending vehicle purchases using the cryptocurrency.  

A day later he again tweeted saying, To be clear, I strongly believe in crypto, but it can't drive a massive increase in fossil fuel use, especially coal. It triggered a downward spiral for Bitcoin value but the cryptocurrency has stabilised since.  A number of Twitter users welcomed Musk's statement. One of them said it's time people started realising that Dogecoin is here to stay and another referred to Musk's previous assertion that crypto could become the world's future currency.
`,
    type: "mcq",
  };
  a && console.log(a);
  console.log(submitVaule.type === "mcq");
  useEffect(() => {
    try {
      const fetchFun = async () => {
        const data = await axios.get("http://aa68-35-247-80-37.ngrok.io", {
          params: textObj,
        });
        setA(data);
      };
      // fetchFun();
    } catch (e) {
      console.log("Errro from ", e);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <QuizForm setSubmitVaule={setSubmitVaule} />
          </div>
        </div>
      </div>
    </>
  );
};

export default arfat2;
