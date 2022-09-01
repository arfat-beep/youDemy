import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/style.css";
import TopNav from "../components/TopNav";
const _app = ({ Component, pageProps }) => {
  return (
    <>
      <TopNav />
      <Component {...pageProps} />
    </>
  );
};

export default _app;
