import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { updatePost } from "../store/posts/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const EditReduxBlog = (props) => {
  let dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { success, statusbutton } = useSelector((state) => state.BlogReducer);
  const findFormErrors = () => {
    const newErrors = {};
    // title errors
    if (!title || title === "") setTitle(props.dataupdate.title);
    else if (title.length > 255) newErrors.lastName = "title is too long!";
    // content errors
    if (!content || content === "") setContent(props.dataupdate.content);
    else if (content.length > 1000) newErrors.content = "content is too long!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      let editconfirm = false;
      props.addBlogProps(editconfirm, success, statusbutton);
    } else {
      let editconfirm = true;
      let id=props.dataupdate.id;
      const values = { id, title, content, selectedFile };
      console.log(props.dataupdate.id, "iddddddddddddddddd");
      console.log(values, "valueeeeeeeeeeeee");
      dispatch(updatePost(values));
      setTitle("");
      setContent("");
      setSelectedFile(null);
      props.editBlogProps(editconfirm, success, statusbutton);
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
                <img
                  src={props.dataupdate.image.url}
                  alt="blogimage"
                  style={{ width: "200px", height: "160px" }}
                />
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
                    {props.statusbutton}
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
    </>
  );
};

export default EditReduxBlog;
