import React, { useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";

const CourseCreate = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    category: "",
    paid: true,
    loading: false,
  });

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload image");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // console.log(e);
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("Image uploaded", data);

        // set image in the state
        setImage(data);

        setValues({ ...values, loading: false });
        toast.success("Image uploaded");
      } catch (e) {
        console.log("Error from handleImage => Resizer try catch : ", e);
        setValues({ ...values, loading: false });
        toast.error("Image upload failed. Try later");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Remove selected image also form S3
  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (e) {
      console.log("Error from handleImageRemove catch =>", e);
      toast.error("Failed to remove image");
      setValues({ ...values, loading: false });
    }
  };
  return (
    <InstructorRoute>
      <h1 className="jumbotron bg-primary text-center">Create Course</h1>
      <div className="px-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;
