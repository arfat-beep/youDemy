import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/style.css";

// REact toastify  import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "../components/TopNav";
const _app = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </>
  );
};

export default _app;
