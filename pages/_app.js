import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/style.css";

// REact toastify  import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "../components/TopNav";
import { Provider } from "../context";
import Footer from "../components/extraComponent/Footer";
const _app = ({ Component, pageProps }) => {
  return (
    <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
};

export default _app;
