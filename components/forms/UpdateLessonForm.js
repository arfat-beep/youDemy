import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Tooltip } from "antd";
import React from "react";

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploadVideoButtonText,
  progress,
  uploading,
}) => {
  return (
    <div className="container pt-3">
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
          onChange={(e) => setValues({ ...current, content: e.target.value })}
          cols="7"
          rows="7"
          value={current.content}
          className="form-control mt-3"
        ></textarea>

        <div className="container-fluid justify-content-center">
          <div class="row">
            <label className=" col btn btn-dark btn-block text-left mt-3">
              {uploadVideoButtonText}
              <input type="file" accept="video/*" hidden />
            </label>
            {!uploading && current.video && current.video.Location && (
              <div className="pt-2 d-flex justify-content-center">
                Show video player on react player
              </div>
            )}
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
          <div className="pt-3 badge text-primary">Preview</div>
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
