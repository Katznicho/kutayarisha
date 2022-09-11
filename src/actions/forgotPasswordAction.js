import * as types from "../actions/types";
import { api } from "../Api/index";
import { createMessage } from "./authAction";
export const forgotpasswordAction = (data) => async (dispatch) => {
  dispatch({
    type: types.FORGOT_PASSWORD_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await api.post("/auth/send_verification_code/", data, config);
    dispatch({
      type: types.FORGOT_PASSWORD_SUCCESS,
      payload: "Please check your email or spam folder for confirmation code",
    });
    dispatch(
      createMessage(
        "Please check your email or spam folder for confirmation code",
        "confirmation_code"
      )
    );
  } catch (error) {
    dispatch({
      type: types.FORGOT_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};
