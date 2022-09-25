import React, { useEffect, useState } from "react";
import { Select, Button } from "antd";

const { Option } = Select;

const CourseCreateForm = ({
  handleImage,
  handleSubmit,
  handleChange,
  values,
  setValues,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>$ {i.toFixed(2)}</Option>);
  }

  console.log(children);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group pt-3">
          <textarea
            name="description"
            cols={"7"}
            rows="7"
            className="form-control"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="row pt-3">
          <div className="col">
            <div className="form-group">
              <Select
                style={{ width: "100%" }}
                size="large"
                value={values.paid}
                onChange={(v) => setValues({ ...values, paid: !values.paid })}
              >
                <Option value={true}>Paid</Option>
                <Option value={false}>Free</Option>
              </Select>
            </div>
          </div>
          {values.paid && (
            <div className="col-md-6">
              <div className="form-group">
                <Select
                  defaultValue={"$9.99"}
                  style={{ width: "100%" }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size={"large"}
                >
                  {children}
                </Select>
              </div>
            </div>
          )}
        </div>
        <div className="form-group pt-3">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Category"
            value={values.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-row pt-3">
          <div className="col">
            <div className="form-group">
              <div class="d-grid gap-2">
                <label className="btn btn-outline-secondary btn-block text-left">
                  {values.loading ? "Uploading" : "Image Upload"}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    className="form-control"
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <Button
              onClick={handleSubmit}
              disabled={values.loading || values.uploading}
              className="btn btn-primary"
              loading={values.loading}
              type="primary"
              size="large"
              shape="round"
            >
              {values.loading ? "Saving..." : "Save and Continue"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CourseCreateForm;
