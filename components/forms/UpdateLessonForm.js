import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Switch, Tooltip } from "antd";
import React from "react";
import ReactPlayer from "react-player";
const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploadVideoButtonText,
  progress,
  uploading,
  handleVideo,
}) => {
  return (
    <div className="container pt-3">
      {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className="form-control round"
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          autoFocus
          required
        />
        <textarea
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          cols="7"
          rows="7"
          value={current.content}
          className="form-control mt-3"
        ></textarea>

        <div className="container-fluid justify-content-center">
          <div class="row">
            {!uploading && current.video && current.video.Location && (
              <div className="pt-2 d-flex justify-content-center">
                <ReactPlayer
                  url={current.video.Location}
                  width="410px"
                  height={"240"}
                  controls
                />
              </div>
            )}
            <label className=" col btn btn-dark btn-block text-left mt-3">
              {uploadVideoButtonText}
              <input
                type="file"
                accept="video/*"
                onChange={handleVideo}
                hidden
              />
            </label>
          </div>
        </div>
        <div className="d-grid">
          {progress > 0 && (
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              className="d-flex justify-content-center pt-2"
              percent={progress}
            />
          )}
        </div>
        <div className="d-flex justify-content-between">
          <span className="pt-3 badge " style={{ color: "black" }}>
            Preview
          </span>
          <Switch
            className="float-right mt-2"
            disabled={uploading}
            checked={current.free_preview}
            name="free_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
        </div>
        <div className="d-grid">
          <Button
            onClick={handleUpdateLesson}
            className="col mt-3"
            size="large"
            type="primary"
            loading={uploading}
            shape="round"
          >
            {" "}
            Save{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
