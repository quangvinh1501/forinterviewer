import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createPost } from "../store/posts/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AddReduxBlog = (props) => {
  let dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { success, statusbutton } = useSelector((state) => state.BlogReducer);
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
      setErrors(newErrors);
      let addconfirm = false;
      props.addBlogProps(addconfirm, success, statusbutton);
    } else {
      const values = {title, content, selectedFile};
      dispatch(createPost(values));
      setTitle("");
      setContent("");
      setSelectedFile(null);
      let addconfirm = true;
      props.addBlogProps(addconfirm, success, statusbutton);
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
                {props.statusbutton}
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
    </>
  );
};

export default AddReduxBlog;
