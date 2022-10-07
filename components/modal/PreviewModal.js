import { Modal } from "antd";
import React from "react";
// import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const PreviewModal = ({ showModal, setShowModal, preview }) => {
  return (
    <>
      <Modal
        title="Course preview"
        visible={showModal}
        onCancel={() => setShowModal(!showModal)}
        width={720}
        footer={null}
      >
        <div className="wrapper">
          <ReactPlayer
            url={preview}
            playing={showModal}
            controls={true}
            width="100%"
            height={"100%"}
          />
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
