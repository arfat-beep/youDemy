import React from "react";
import { Image } from "antd";

const PartnerBanner = () => {
  return (
    <div className="bg-light my-4 py-4">
      <div className="m-auto text-center" style={{ width: "90%" }}>
        <h4>Trusted by over 10000+ great students</h4>
        <p>
          Leading comanies use the same courses to help employees keep their
          skills freash.
        </p>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-4 col-6 m-auto pt-3">
              <Image
                preview={false}
                width={"100%"}
                src="https://i.ibb.co/cxj0yk4/nasdaq-dark.png"
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6  m-auto pt-3">
              <Image
                preview={false}
                width={"100%"}
                src="https://i.ibb.co/k32xMVQ/volkswagen-dark.png"
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6  m-auto pt-3">
              <Image
                preview={false}
                width={"100%"}
                src="https://i.ibb.co/WDy1ycJ/box-dark.png"
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6  m-auto pt-3">
              <Image
                preview={false}
                width={"100%"}
                src="https://i.ibb.co/c8vq5dp/netapp-dark.png"
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6  m-auto pt-3">
              <Image
                preview={false}
                width={"100%"}
                src="https://i.ibb.co/1zK5FR8/eventbrite-dark.png"
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6  m-auto pt-3">
              <Image
                preview={false}
                width={"100%"}
                src="https://i.ibb.co/7N37XvV/tcs-dark.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerBanner;
