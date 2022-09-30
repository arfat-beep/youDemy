import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Tooltip } from "antd";
import React from "react";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control round"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          autoFocus
          placeholder="Title"
          required
        />
        <textarea
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          cols="7"
          rows="7"
          value={values.content}
          className="form-control mt-3"
          placeholder="Content"
        ></textarea>

        <div className="container-fluid justify-content-center">
          <div class="row">
            <label className=" col btn btn-dark btn-block text-left mt-3">
              {uploadButtonText}
              <input
                type="file"
                onChange={handleVideo}
                accept="video/*"
                hidden
              />
            </label>
            {!uploading && values.video.Location && (
              <Tooltip title="Remove" className="col-3">
                <span className="pt-1 ps-3" onClick={handleVideoRemove}>
                  <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
                </span>
              </Tooltip>
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
        <div className="d-grid">
          <Button
            onClick={handleAddLesson}
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

export default AddLessonForm;
