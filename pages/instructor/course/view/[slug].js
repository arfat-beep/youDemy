import axios from "axios";
import { useRouter } from "next/router";
import { Avatar, Button, List, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import { CheckOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";
const CourseView = () => {
  const [course, setCourse] = useState({});

  // for lessons add
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  // functions for add lessons
  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: "", content: "", video: {} });
      setVisible(false);
      setUploadButtonText("Upload video");
      setCourse(data);
      toast.success("Lesson added");
    } catch (e) {
      console.log("Errror from handleAddLesson catch =>", e);
      toast.error("Lesson add failed");
    }
  };
  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);

      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

      // once response is received
      // console.log("data from handleVideo =>", data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (e) {
      toast.error("Video upload failed");
      setUploading(false);
    }
  };
  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/remove-video//${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (e) {
      console.log("error form handleVideoRemove =>", e);
      setUploading(false);
      toast.error("Video remove failed");
    }
  };

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {course && (
          <div className="contaienr-fluid pt-1">
            <div className="d-flex pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="w-100 ms-3">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary"> {course.name} </h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>
                  <div className="col-3">
                    <div className="d-flex pt-4 justify-content-center">
                      <Tooltip title="Edit">
                        <EditOutlined
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            router.push(`/instructor/course/edit/${slug}`)
                          }
                          className="h5 text-warning me-4"
                        />
                      </Tooltip>
                      <Tooltip title="Publish">
                        <CheckOutlined
                          className="h5 text-danger"
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                {" "}
                <ReactMarkdown children={course.description} />{" "}
              </div>
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lesson
              </Button>
            </div>
            <br />
            <Modal
              title="+ Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddLessonForm
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>
            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {" "}
                  {course &&
                    course.lessons &&
                    course.lessons.length} Lessons{" "}
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
        {/* <pre> {JSON.stringify(course, null, 4)} </pre> */}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
