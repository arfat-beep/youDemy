import React, { useContext, useRef, useState } from "react";
import { Context } from "../context";
import jsPDF from "jspdf";
import myFont from "../public/Courgette-Regular-normal";
import { PDFObject } from "react-pdfobject";

const arfat = () => {
  const [url, setUrl] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const pdfGenerator = async () => {
    const doc = new jsPDF("landscape", "px", "a4", false);

    doc.addImage("/certificate.png", "png", 65, 20, 500, 400);

    // fonts
    doc.addFileToVFS("MyFont.ttf", myFont);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    // doc.setFont("Courgette-Regular", "normal");
    doc.setFontSize(50);
    doc.text(user.name, 150, 260);

    doc.setFont("courier", "normal");
    doc.setFontSize(20);
    doc.text("for his achievements of completing ", 150, 290);
    doc.text("in the 2022 public speaking training", 150, 310);
    doc.text("activities", 150, 330);

    setUrl(doc.output("bloburi"));
    doc.save(`${user.name}.pdf`);
  };
  //   console.log(user);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <button onClick={() => pdfGenerator()}>arfat vai</button>
            <PDFObject url={url} height="800px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default arfat;
