import axios from "axios";

export default axios.create({
  baseURL: "https://api-placeholder.herokuapp.com/api/v1/blogs",
  headers: {
    "Content-type": "application/json"
  }
});
