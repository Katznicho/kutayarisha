import * as types from "../actions/types";
import { api, tokenConfig } from "../Api/index";


//get_user_type
export const check_user_type = (username) => async (dispatch) => {
  dispatch({
    type: types.CHECK_USER_TYPE_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username });
  try {
    const res = await api.post("/auth/user_type_check/", body, config);
    dispatch({
      type: types.CHECK_USER_TYPE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.CHECK_USER_TYPE_FAIL,
      payload: error.response.data,
    });
  }
};

//login user
export const loginData = (loginValues) => async (dispatch) => {
  dispatch({
    type: types.LOGIN_LOADING,
  });
  try {
    const res = await api.post("/auth/signin/", loginValues);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

//load user
export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: types.LOAD_USER_LOADING,
  });
  try {
    const res = await api.get("/auth/users_me/", tokenConfig(getState));
    dispatch({
      type: types.LOAD_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.LOAD_USER_FAIL,
      payload: error.response.data,
    });
  }
};

//update user
export const profileData = (id, data) => async (dispatch, getState) => {
  dispatch({
    type: types.PROFILE_LOADING,
  });
  try {
    const res = await api.patch(
      `/auth/users/${id}/`,
      data,
      tokenConfig(getState)
    );
    dispatch({
      type: types.PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};

// change user password

export const changeUserPassword = (data) => async (dispatch, getState) => {
  dispatch({
    type: types.CHANGE_PASSWORD_LOADING,
  });
  try {
    const res = await api.post(
      `/auth/password/change/`,
      data,
      tokenConfig(getState)
    );
    console.log(res.data);
    dispatch({
      type: types.CHANGE_PASSWORD_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: types.CHANGE_PASSWORD_FAIL,
      payload: error.response?.data,
    });
  }
};

export const code_verification = (code) => (dispatch) => {
  dispatch({
    type: types.CODE_VERIFICATION_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = api.post("/auth/confirm_verification_code/", code, config);
    dispatch({
      type: types.CODE_VERIFICATION_SUCCESS,
      payload: res,
    });
    dispatch(
      createMessage(
        "This was successfully, you will be redirect to the rest password page",
        "confirmation_true"
      )
    );
  } catch (error) {
    dispatch({
      type: types.CODE_VERIFICATION_FAIL,
      payload: error.response?.data,
    });
  }
};

export const reset_password = (rest_data) => (dispatch) => {
  dispatch({
    type: types.REST_PASSWORD_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = api.post("/auth/reset_password/", rest_data, config);
    dispatch({
      type: types.REST_PASSWORD_SUCCESS,
      payload: res.data,
    });
    dispatch(createMessage(res.data, "rest_successfull"));
  } catch (error) {
    dispatch({
      type: types.REST_PASSWORD_FAIL,
      payload: error.response?.data,
    });
  }
};

//logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: types.LOGOUT_SUCCESS,
  });
};

export const getErrors = (data) => (dispatch) => {
  dispatch({
    type: types.GET_ERRORS,
    payload: data,
  });
};

//clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_ERRORS_LOADING,
  });
  dispatch({
    type: types.CLEAR_ERRORS_SUCCESS,
  });
};

export const createMessage = (msg, reason) => (dispatch) => {
  dispatch({
    type: types.CREATE_MESSAGES_LOADING,
  });
  dispatch({
    type: types.CREATE_MESSAGES_SUCCESS,
    payload: msg,
    reason: reason,
  });
};

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_MESSAGES_LOADING,
  });
  dispatch({
    type: types.CLEAR_MESSAGES_SUCCESS,
  });
};


