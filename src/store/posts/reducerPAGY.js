import {
    GET_POST_PAGY,
    GET_POST_PAGY_SUCCESS,
    GET_POST_PAGY_FAIL,
  } from "./actionTypes";
  
  const initialState = {
    pagys: [],
    loadingPagys: false,
    loadingPagyDetails: false,
    error: {
      message: "",
    },
  };
  
  const PagyReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POST_PAGY:
        state = { ...state, loadingPagys: true };
        break;
      case GET_POST_PAGY_SUCCESS:
        state = { ...state, pagys: action.payload, loadingPagys: false };
        break;
      case GET_POST_PAGY_FAIL:
        state = {
          ...state,
          error: {
            message: "Error",
          },
          loadingPagys: false,
        };
        break;
      default:
        state = { ...state };
        break;
    }
    return state;
  };
  
  export default PagyReducer;
  