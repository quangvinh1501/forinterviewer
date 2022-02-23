import {
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAIL,
  GET_POST_PAGY,
  GET_POST_PAGY_SUCCESS,
  GET_POST_PAGY_FAIL,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL
} from "./actionTypes";

export const getPAGY = (values) => {
  return {
    type: GET_POST_PAGY,
    payload: values
  };
};

export const getPAGYSuccess = (posts) => {
  return {
    type: GET_POST_PAGY_SUCCESS,
    payload: posts,
  };
};

export const getPAGYFail = (error) => {
  return {
    type: GET_POST_PAGY_FAIL,
    payload: error,
  };
};
export const updatePost = (values) => {
  return {
    type: UPDATE_POST,
    payload: values
  };
};

export const updatePostSuccess = (posts) => {
  return {
    type: UPDATE_POST_SUCCESS,
    payload: posts,
  };
};

export const updatePostFail = (error) => {
  return {
    type: UPDATE_POST_FAIL,
    payload: error,
  };
};
export const createPost = (values) => {
  return {
    type: CREATE_POST,
    payload: values
  };
};

export const createPostSuccess = (posts) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload: posts,
  };
};

export const createPostFail = (error) => {
  return {
    type: CREATE_POST_FAIL,
    payload: error,
  };
};

export const getPosts = (values) => {
  return {
    type: GET_POSTS,
    payload: values
  };
};

export const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: posts,
  };
};

export const getPostsFail = (error) => {
  return {
    type: GET_POSTS_FAIL,
    payload: error,
  };
};

export const getPostDetails = (id) => {
  return {
    type: GET_POST_DETAILS,
    payload: id,
  };
};

export const getPostDetailsSuccess = (post) => {
  return {
    type: GET_POST_DETAILS_SUCCESS,
    payload: post,
  };
};

export const getPostDetailsFail = (error) => {
  return {
    type: GET_POST_DETAILS_FAIL,
    payload: error,
  };
};

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id,
  };
};

export const deletePostSuccess = (post) => {
  return {
    type: DELETE_POST_SUCCESS,
    payload: post,
  };
};

export const deletePostFail = (error) => {
  return {
    type: DELETE_POST_FAIL,
    payload: error,
  };
};
