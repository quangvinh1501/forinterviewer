import axios from "axios";
import { toast } from "react-toastify";
//Post
export const getPAGY = async (values) => {
  const response = await axios.get(
    "https://api-placeholder.herokuapp.com/api/v1/blogs",
    {
      params: {
        page: parseInt(values.currentPage),
        items: parseInt(values.item),
        sort_direction: values.sortdirection,
        sort_by: values.sortby,
        search: values.keyword,
      },
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(response.pagy, "gia tri pagy o backend_helper");
  return response.data.pagy;
};
export const createPost = async (values) => {
  var body = new FormData();
  body.append("blog[title]", values.title);
  body.append("blog[content]", values.content);
  body.append("blog[image]", values.selectedFile);
  return await axios({
    mod: "cors",
    data: body,
    method: "post",
    url: "https://api-placeholder.herokuapp.com/api/v1/blogs",
    headers: { "Content-Type": "multipart/form-data", accept: "*/*" },
  })
    .then((response) => {
      toast.success("Blog created", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return response.data.data;
    })
    .catch((error) => {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};
export const deletePost = async (id) => {
  console.log(id, "helpers.............");
  return await axios({
    mod: "cors",
    method: "delete",
    url: "https://api-placeholder.herokuapp.com/api/v1/blogs/"+id,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      toast.success("deleted blog", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return response.data.data;
    })
    .catch((error) => {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};
export const updatePost = async (values) => {
  console.log(values.title, "helpers.............");
  var body = new FormData();
      if (values.selectedFile === null) {
        body.append("blog[title]", values.title);
        body.append("blog[content]", values.content);
      } else {
        body.append("blog[title]", values.title);
        body.append("blog[content]", values.content);
        body.append("blog[image]", values.selectedFile);
      }
  return await axios({
    mod: "cors",
    data: body,
    method: "put",
    url: "https://api-placeholder.herokuapp.com/api/v1/blogs/"+values.id,
    headers: { "Content-Type": "multipart/form-data", accept: "*/*" },
  })
    .then((response) => {
      toast.success("Blog updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return response.data.data;
    })
    .catch((error) => {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};
export const getPosts = async (values) => {
  const response = await axios.get(
    "https://api-placeholder.herokuapp.com/api/v1/blogs",
    {
      params: {
        page: parseInt(values.currentPage),
        items: parseInt(values.item),
        sort_direction: values.sortdirection,
        sort_by: values.sortby,
        search: values.keyword,
      },
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(response.data, "gia tri o backend_helper");
  return response.data.data;
};

export const getPostDetails = async (id) => {
  const response = await axios.get(
    "https://api-placeholder.herokuapp.com/api/v1/blogs/" + id,
    {
      headers: { "Content-Type": "application/json" },
      params: {
        id: parseInt(id),
      },
    }
  );
  return response.data.data;
};
