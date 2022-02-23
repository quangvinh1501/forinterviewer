import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const EditHookBlog = (props) => {
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Update");

  const findFormErrors = () => {
    const newErrors = {};
    // title errors
    if (!title || title === "") 
    setTitle(props.dataupdate.title);
    else if (title.length > 255) newErrors.lastName = "title is too long!";
    // content errors
    if (!content || content === "")
    setContent(props.dataupdate.content);
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
      props.editBlogProps(false);
    } else {
      var body = new FormData();
      if (selectedFile === null) {
        body.append("blog[title]", title);
        body.append("blog[content]", content);
      } else {
        body.append("blog[title]", title);
        body.append("blog[content]", content);
        body.append("blog[image]", selectedFile);
      }

      setStatus("Sending....");
      await axios({
        mod: "cors",
        method: "put",
        data: body,
        url: "https://api-placeholder.herokuapp.com/api/v1/blogs/"+props.dataupdate.id,
        headers: { "Content-Type": "multipart/form-data", accept: "*/*" },
      })
        .then(function (response) {
          //handle success
          if (response.status === 200) {
            setTitle("");
            setContent("");
            setSelectedFile(null);
            toast.success("Blog updated", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setStatus("Submit");
            props.editBlogProps(true);
          } else if(response.status === 422) {
            toast.error("Unprocessable request", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            props.editBlogProps(false);
          }else{
            toast.error("Blog not found", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              props.editBlogProps(false);
          }
        })
        .catch(function (response) {
          //handle error
          props.editBlogProps(false);
          console.log(response);
        });
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        animation={true}
        {...props.dataupdate}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="col">
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      defaultValue={props.dataupdate.title}
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
                <div className="col">
                  <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      id="file"
                      name="file"
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="col">
                <img src={props.dataupdate.image.url} alt="blogimage" style={{width: '200px',height: '160px'}} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    defaultValue={props.dataupdate.content}
                    name="content"
                    as="textarea"
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    isInvalid={!!errors.content}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.content}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="col-sm-12 mb-3" style={{ textAlign: "center" }}>
                  <Button variant="primary" type="submit">
                    {status}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.hideModalEditHook()}>
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

export default EditHookBlog;
