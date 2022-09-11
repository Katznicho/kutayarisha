import * as types from "../actions/types";

const initialState = {
  profile_loading: false,
  password_loading: false,
  loading: true,
  user_loading: false,
  login_loading: false,
  error_loading: false,
  userInfo: null,
  error: null,
  isAuthenticated: false,
  token: localStorage.getItem("user_token"),
  message: null,
  reason: null,
  check_user_type_loading: false,
  get_user_type: null,
  success_message: null,
  success: false,
  code_loading: false,
  rest_loading: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_LOADING:
      return {
        ...state,
        login_loading: true,
      };

    case types.LOAD_USER_LOADING:
      return {
        ...state,
        user_loading: true,
      };

    case types.PROFILE_LOADING:
      return {
        ...state,
        profile_loading: true,
      };

    case types.CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        password_loading: true,
      };

    case types.CLEAR_ERRORS_LOADING:
      return {
        ...state,
        error_loading: true,
      };

    case types.CLEAR_MESSAGES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.REST_PASSWORD_LOADING:
      return {
        ...state,
        rest_loading: true,
      };
    case types.CODE_VERIFICATION_LOADING:
      return {
        ...state,
        code_loading: true,
      };

    case types.REST_PASSWORD_SUCCESS:
      return {
        ...state,
        rest_loading: false,
        message: action.payload,
        rest_success:true
      };

    case types.CREATE_MESSAGES_SUCCESS:
      return {
        ...state,
        message_loading: false,
        message: action.payload,
        reason: action.reason,
      };

    case types.CODE_VERIFICATION_SUCCESS:
      return {
        ...state,
        code_loading: false,
        message: action.payload,
        success: true,
      };

    case types.CHECK_USER_TYPE_LOADING:
      return {
        ...state,
        check_user_type_loading: true,
      };

    case types.CHECK_USER_TYPE_SUCCESS:
      return {
        ...state,
        check_user_type_loading: false,
        get_user_type: action.payload.user_type,
      };

    case types.LOGIN_SUCCESS:
      localStorage.setItem("user_token", JSON.stringify(action.payload.token));
      return {
        ...state,
        login_loading: false,
        isAuthenticated: true,
      };

    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        user_loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case types.PROFILE_SUCCESS:
      return {
        ...state,
        profile_loading: false,
        userInfo: action.payload,
        isAuthenticated: true,
      };

    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        password_loading: false,
        success_message: action.payload,
        isAuthenticated: true,
      };

    case types.LOGOUT_SUCCESS:
      localStorage.removeItem("user_token");
      return {
        ...state,
        loading: false,
        userInfo: null,
        token: null,
        isAuthenticated: false,
      };

    case types.LOGIN_FAIL:
      return {
        ...state,
        login_loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case types.CHECK_USER_TYPE_FAIL:
      return {
        ...state,
        check_user_type_loading: false,
        error: action.payload,
        get_user_type: null,
      };

    case types.LOAD_USER_FAIL:
      return {
        ...state,
        user_loading: false,
        error: action.payload,
        is_registered: false,
      };

    case types.PROFILE_FAIL:
      return {
        ...state,
        profile_loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case types.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        password_loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case types.CLEAR_ERRORS_SUCCESS:
      return {
        ...state,
        error: null,
        error_loading: false,
      };

    case types.CLEAR_MESSAGES_SUCCESS:
      return {
        ...state,
        message_loading: false,
        message: null,
        reason: null,
        get_user_type: null,
      };

    case types.REST_PASSWORD_FAIL:
      return {
        ...state,
        rest_loading: false,
        error: action.payload,
        rest_success:false
      };

    case types.CODE_VERIFICATION_FAIL:
      return {
        ...state,
        code_loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
