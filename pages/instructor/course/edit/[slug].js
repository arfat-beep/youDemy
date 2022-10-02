import React, { useEffect, useState } from "react";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Item from "antd/lib/list/Item";
import { Avatar, List, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";

const CourseEdit = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    category: "",
    paid: true,
    loading: false,
    lessons: [],
  });

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload image");
  const [lessonsLength, setLessonsLength] = useState(0);

  // statte for lessons update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
    if (data && data.lessons && data.lessons.length)
      setLessonsLength(data.lessons.length);
  };

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
        // console.log("Image uploaded", data);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast.success("Course updated");
      //   router.push("/instructor");
    } catch (e) {
      toast.error(e.response.data);
    }
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
      toast.success("Image is removed");
    } catch (e) {
      console.log("Error from handleImageRemove catch =>", e);
      toast.error("Failed to remove image");
      setValues({ ...values, loading: false });
    }
  };

  // handle drag and drop lessons
  const handleDrag = (e, index) => {
    // console.log("On drag", index);
    e.dataTransfer.setData("itemIndex", index);
  };
  const handleDrop = async (e, index) => {
    // console.log("on drop", index);
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex]; // dragged item to re-oreder
    allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setValues({ ...values, lessons: [...allLessons] });

    // save the new lessosns order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    console.log("Lessons rearrange =>", data);
    toast.success("Lessons rearrange successfull");
  };

  // delete lesson from all lessons list
  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete");
    if (!answer) return;

    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    setValues({ ...values, lessons: allLessons });

    // send request to server
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log("handleDelete", data);
  };

  // Lesson update functions
  const handleVideo = () => {
    console.log("Handle video");
  };
  const handleUpdateLesson = () => {
    console.log("handle lessosn");
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron bg-primary text-center">Edit Course</h1>
      <div className="px-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          handleImageRemove={handleImageRemove}
          uploadButtonText={uploadButtonText}
          editPage={true}
        />
      </div>
      <hr />
      <div className="container-fluid">
        <div className="row pb-5">
          <div className="col lesson-list">
            <h4>{lessonsLength} Lessons</h4>
            <List
              onDragOver={(e) => e.preventDefault()}
              itemLayout="horizontal"
              dataSource={values && values.lessons}
              renderItem={(item, index) => (
                <Item
                  draggable
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <Item.Meta
                    onClick={() => {
                      setVisible(true);
                      setCurrent(item);
                    }}
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                  ></Item.Meta>
                  <DeleteOutlined
                    onClick={() => handleDelete(index)}
                    className="text-danger float-right"
                    style={{ cursor: "pointer" }}
                  />
                </Item>
              )}
            ></List>
          </div>
        </div>
      </div>

      <Modal
        title="update lesson"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
        />
        {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      </Modal>

      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre> */}
    </InstructorRoute>
  );
};

export default CourseEdit;
