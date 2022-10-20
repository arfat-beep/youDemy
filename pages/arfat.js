import React, { useContext } from "react";
import { Context } from "../context";
import download from "downloadjs";
const { degrees, PDFDocument, rgb, StandardFonts } = require("pdf-lib");

const arfat = () => {
  //   console.log(fs);
  const encryptedPdf = async () => {
    console.log("hi");
    const url =
      "https://matfuvit.github.io/UVIT/predavanja/literatura/TutorialsPoint%20node.js.pdf";

    const existingPdfBytes = await fetch(url).then((res) => {
      //   res.headers = { arfat: "arfat" };
      return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText("This text was added with JavaScript!", {
      x: 2,
      y: 600,
      size: 50,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    });

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    console.log("pdfBytes", pdfBytes);
  };
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  //   console.log(user);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <button onClick={() => encryptedPdf()}>arfat vai</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default arfat;
