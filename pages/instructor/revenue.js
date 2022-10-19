import { Context } from "../../context";
import InstructorRoute from "../../components/routes/InstructorRoute";
import axios from "axios";
import { currencyFormatter } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { DollarOutlined, SettingOutlined } from "@ant-design/icons";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ panding: [] });
  useEffect(() => {
    sendBalanceRequest();
  }, []);
  const sendBalanceRequest = async () => {
    console.log("search balance");
  };
  const handlePayoutSettings = async () => {
    console.log("handlePayoutSettings");
  };
  return (
    <InstructorRoute>
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-8 offset-md-2 bg-light p-5">
            <h2>
              Revenue report <DollarOutlined className="float-end" />
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hours
            </small>
            <hr />
            <h4>
              Pending balance <span className="float-end">$0.00</span>
            </h4>
            <small>For 48 hours</small>
            <hr />
            <h4>
              Payouts{" "}
              <SettingOutlined
                className="float-end pointer hover-spin"
                onClick={handlePayoutSettings}
              />
            </h4>
            <small>
              Update your stripe account details or view previous payouts
            </small>
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorRevenue;
