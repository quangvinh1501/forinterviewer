import { takeLatest, put, call, takeEvery } from "redux-saga/effects";

import { GET_POSTS, GET_POST_DETAILS, GET_POST_PAGY, CREATE_POST, UPDATE_POST, DELETE_POST } from "./actionTypes";

import {
  getPAGYSuccess,
  getPAGYFail,
  getPostsSuccess,
  getPostsFail,
  getPostDetailsSuccess,
  getPostDetailsFail,
  createPostSuccess,
  createPostFail,
  updatePostSuccess,
  updatePostFail,
  deletePostSuccess,
  deletePostFail,
} from "./actions";

import { updatePost, createPost, getPosts, getPostDetails, getPAGY, deletePost } from "../../helpers/backend_helper";

function* onGetPAGY({ payload: values }) {
  try {
    const response = yield call(getPAGY, values);
    yield put(getPAGYSuccess(response));
  } catch (error) {
    yield put(getPAGYFail(error.response));
  }
}
function* onCreatePost({payload: values}) {
  try {
    const response = yield call(createPost, values);
    yield put(createPostSuccess(response));
  } catch (error) {
    yield put(createPostFail(error.response));
  }
}
function* onUpdatePost({payload: values}) {
  console.log(values,'sagaaaaaaaaaaaaaaa............');
  try {
    const response = yield call(updatePost, values);
    yield put(updatePostSuccess(response));
  } catch (error) {
    yield put(updatePostFail(error.response));
  }
}
function* onGetPosts({ payload: values }) {
  try {
    const response = yield call(getPosts, values);
    yield put(getPostsSuccess(response));
  } catch (error) {
    yield put(getPostsFail(error.response));
  }
}

function* onGetPostDetails({ payload: id }) {
  try {
    const response = yield call(getPostDetails, id);
    yield put(getPostDetailsSuccess(response));
  } catch (error) {
    yield put(getPostDetailsFail(error.response));
  }
}
function* onDeletePost({ payload: id }) {
  try {
    const response = yield call(deletePost, id);
    yield put(deletePostSuccess(response));
  } catch (error) {
    yield put(deletePostFail(error.response));
  }
}
function* CartSaga() {
  yield takeEvery(GET_POST_PAGY, onGetPAGY);
  yield takeLatest(CREATE_POST, onCreatePost);
  yield takeLatest(DELETE_POST, onDeletePost);
  yield takeLatest(UPDATE_POST, onUpdatePost);
  yield takeEvery(GET_POSTS, onGetPosts);
  yield takeLatest(GET_POST_DETAILS, onGetPostDetails);
}

export default CartSaga;
