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
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
} from "./actionTypes";

const initialState = {
  posts: [],
  post: {},
  loadingPosts: false,
  loadingPostDetails: false,
  success: false,
  messagesok: "",
  messageerror: "",
  statusbutton: "",
};

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POST:
      state = {
        ...state,
        loadingPosts: true,
        success: false,
        messagesok: "loading...",
        messageerror: "",
        statusbutton: "Updating...",
      };
      break;
    case UPDATE_POST_SUCCESS:
      state = {
        ...state,
        loadingPosts: false,
        success: true,
        messagesok: "updated blog successfully...",
        messageerror: "",
        statusbutton: "Update"
      };
    break;
    case UPDATE_POST_FAIL:
      state = {
        ...state,
        loadingPosts: false,
        success: false,
        messagesok: "",
        messageerror: "Error!!!",
        statusbutton: "Try Update Again",
      };
      break;
      case DELETE_POST:
      state = {
        ...state,
        loadingPosts: true,
        success: false,
        messagesok: "loading...",
        messageerror: "",
        statusbutton: "Deleting...",
      };
      break;
    case DELETE_POST_SUCCESS:
      state = {
        ...state,
        loadingPosts: false,
        success: true,
        messagesok: "deleted blog successfully...",
        messageerror: "",
        statusbutton: "Delete"
      };
    break;
    case DELETE_POST_FAIL:
      state = {
        ...state,
        loadingPosts: false,
        success: false,
        messagesok: "",
        messageerror: "Error!!!",
        statusbutton: "Try Delete Again",
      };
      break;
    case CREATE_POST:
      state = {
        ...state,
        loadingPosts: true,
        success: false,
        messagesok: "loading...",
        messageerror: "",
        statusbutton: "Sending",
      };
      break;
    case CREATE_POST_SUCCESS:
      state = {
        ...state,
        loadingPosts: false,
        success: true,
        messagesok: "created blog successfully...",
        messageerror: "",
        statusbutton: "Submit",
      };
      break;
    case CREATE_POST_FAIL:
      state = {
        ...state,
        loadingPosts: false,
        success: false,
        messagesok: "",
        messageerror: "Error!!!",
        statusbutton: "Try Submit Again",
      };
      break;
    case GET_POSTS:
      state = {
        ...state,
        loadingPosts: true,
        success: false,
        messagesok: "",
        messageerror: "",
        statusbutton: "Submit",
      };
      break;
    case GET_POSTS_SUCCESS:
      state = {
        ...state,
        posts: action.payload,
        loadingPosts: false,
        success: true,
        messagesok: "",
        messageerror: "",
        statusbutton: "Submit",
      };
      break;
    case GET_POSTS_FAIL:
      state = {
        ...state,
        success: false,
        messagesok: "",
        messageerror: "",
        statusbutton: "Submit",
        loadingPosts: false,
      };
      break;
    case GET_POST_DETAILS:
      state = {
        ...state,
        loadingPostDetails: true,
        success: false,
        messagesok: "",
        messageerror: "",
        statusbutton: "Submit",
      };
      break;
    case GET_POST_DETAILS_SUCCESS:
      state = {
        ...state,
        post: action.payload[0],
        loadingPostDetails: false,
        success: true,
        messagesok: "",
        messageerror: "",
        statusbutton: "Submit",
      };
      break;
    case GET_POST_DETAILS_FAIL:
      state = {
        ...state,
        success: false,
        messagesok: "",
        messageerror: "",
        statusbutton: "Submit",
        loadingPostDetails: false,
      };
      break;
    default:
      state = {
        ...state,
        success: false,
        messagesok: "",
        messageerror: "",
        statusbutton: "Submit",
      };
      break;
  }
  return state;
};

export default BlogReducer;
