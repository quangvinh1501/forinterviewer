import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
const AddHookBlog = (props) => {
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Submit");

  const findFormErrors = () => {
    const newErrors = {};
    // title errors
    if (!title || title === "") newErrors.title = "cannot be blank!";
    else if (title.length > 255) newErrors.lastName = "title is too long!";
    // content errors
    if (!content || content === "") newErrors.content = "cannot be blank!";
    else if (content.length > 1000) newErrors.content = "content is too long!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      toast.error(errors, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setErrors(newErrors);
      props.addBlogProps(false);
    } else {
      var body = new FormData();
      body.append("blog[title]", title);
      body.append("blog[content]", content);
      body.append("blog[image]", selectedFile);
      setStatus("Sending....");
      await axios({
        mod: "cors",
        method: "post",
        data: body,
        url: "https://api-placeholder.herokuapp.com/api/v1/blogs",
        headers: { "Content-Type": "multipart/form-data", accept: "*/*" },
      })
        .then(function (response) {
          //handle success
          if (response.status === 201) {
            setTitle("");
            setContent("");
            setSelectedFile(null);
            toast.success("Blog created", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setStatus("Submit");
            props.addBlogProps(true);
          } else {
            toast.error("Unprocessable entity", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            props.addBlogProps(false);
          }
        })
        .catch(function (response) {
          //handle error
          toast.error(response, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(response);
        });
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="col-sm-6 mb-3">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  name="title"
                  placeholder="title blog....."
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-sm-6 mb-3">
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  id="file"
                  name="file"
                  placeholder="image blog"
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </Form.Group>
            </div>
            <div className="col-sm-12 mb-3">
              <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control
                  value={content}
                  name="content"
                  as="textarea"
                  placeholder="content blog....."
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  isInvalid={!!errors.content}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-sm-12 mb-3" style={{ textAlign: "center" }}>
              <Button variant="primary" type="submit">
                {status}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.hideModalAddHook()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddHookBlog;
