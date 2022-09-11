import React,{useEffect} from "react";
//!!@@#$%^&***()))_+}{}
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

import {
  Alert,
  Button,
  Footer,
  Form,
  Input,
  Loader,
  Logo,
  Text,
} from "../../../components";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import useForm from "../../../hooks/useForm";
import { useDispatch } from "react-redux";

import { logo } from "../../../components/icons/icons";
import { FiAlertCircle } from "react-icons/fi";
import {
  user_login,
  clearMessage,
  createMessage,
  clearErrors,
  get_user_data,
} from "../../../actions/firebaseAction";


const Login = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const { config, firebase } = useSelector(
    (state) => ({
      config: state.config,
      firebase: state.firebase,
    }),
    shallowEqual
  );

  let {
    login_loading,
    error,
    isAuthenticated,
    user,
    reason,
    message,
    userInfo,
  } = {
    ...firebase,
  };

  let { name } = { ...config };

  const {
    loginValues,
    showPassword,
    errors,
    validateLogin,
    handleShowPassword,
    handleInputChange,
  } = useForm(true);


useEffect(() => {

    
    dispatch(clearErrors());

  }, []);
  
  React.useEffect(() => {
    if (isAuthenticated) {
      if (user !== null || user !== undefined) {
        if (user?.uid) {  
          dispatch(get_user_data(user?.uid));
        }
      }
    }
  }, [dispatch, isAuthenticated, user]);

  React.useEffect(() => {
    if (userInfo) {
      if (userInfo !== null || userInfo !== undefined) {
        //userInfo.isAdmin
        if (userInfo.email) {
          window.localStorage.setItem("first_time_login", JSON.stringify(true));
          window.location.href = "/dashboard";
        } else {
          dispatch(
            createMessage("You are not Authorized to sign in", "unauthorized")
          );
        }
      }
    }
  }, [dispatch, userInfo]);

  React.useEffect(() => {
    if (error) {
      if (error) {
        setErrorMessage(error);
      }
    } else {
      setErrorMessage(null);
    }
  }, [error, setErrorMessage]);

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (validateLogin()) {
      //alert("validated");
      if (loginValues.email && loginValues.password) {
        dispatch(user_login(loginValues));
      
      } else {
        dispatch(createMessage("All fields are required", "login_fields"));
      }
    }
    else{
      alert("not validated");
    }
  };

  const handleClearMessage = () => {
    dispatch(clearMessage());
  };

  return (
    <>
      <div className="w-full font-serif  flex flex-row h-screen overflow-hidden">
        <div className="hidden lg:flex lg:flex-col w-1/2 text-white p-8 items-start justify-between relative bg-tunziblue">
          <Logo icon={logo} />
          <Text />
          <Footer />
        </div>
        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-24 flex flex-col items-start justify-center">
          <p className="text-2xl font-bold text-textblue mb-4">
            Login to {name}
          </p>
          {message && reason === "unauthorized" ? (
            <div className="w-full mb-4">
              {(message !== null || message !== undefined) && (
                <Alert
                  error={`text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`}
                  icon={
                    <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />
                  }
                  onClick={handleClearMessage}
                >
                  {message}
                </Alert>
              )}
            </div>
          ) : null}
          {message && reason === "login_fields" ? (
            <div className="w-full mb-4">
              {(message !== null || message !== undefined) && (
                <Alert
                  error={`text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`}
                  icon={
                    <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />
                  }
                  onClick={handleClearMessage}
                >
                  {message}
                </Alert>
              )}
            </div>
          ) : null}
          {
          message && reason === "credentials" ? (
            <div className="w-full mb-4">
              {(message !== null || message !== undefined) && (
                <Alert
                  error={`text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`}
                  icon={
                    <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />
                  }
                  onClick={handleClearMessage}
                >
                  {message}
                </Alert>
              )}
            </div>
          ) : null
          }
          {
            message && reason === "register_success" ? (
              <div className="w-full mb-4">
                {(message !== null || message !== undefined) && (
                  <Alert
                    error={`text-sm text-white bg-green-900 rounded-lg dark:bg-green-200 dark:text-green-800`}
                    icon={
                      <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />
                    }
                    onClick={handleClearMessage}
                  >
                    {message}
                  </Alert>
                )}
              </div>
            ) : null

          }

          <div className="w-full mb-4">
            {errorMessage && (
              <Alert
                error="text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
                errorMessage={errorMessage}
                onClick={() => dispatch(clearErrors())}
              >
                {errorMessage}
              </Alert>
            )}
          </div>
          <div className="w-full">
            <Form onSubmit={handleSubmit} className="flex flex-col w-full mb-4">
              <div className="mb-2">
                <Input
                  title="Email"
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                  value={loginValues.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  width="w-full my-4"
                />

                <Input
                  title="Password"
                  width="w-full my-4"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginValues.password}
                  onChange={handleInputChange}
                  icon={
                    <div onClick={handleShowPassword}>
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </div>
                  }
                  errors={errors.password}
                />
              </div>
              <button
                type="submit"
                className="btn btn-default bg-tunziblue hover:bg-tunziyellow text-white btn-rounded"
              >
                {login_loading ? <Loader /> : "Submit"}
              </button>
            </Form>

            <div className="w-full">
              <span>
                <Link className="text-textblue" to="/auth/create-account">
                  Create Account
                </Link>
                <br/>
                <Link className="text-textblue" to="/auth/forgot-password">
                  Forgot password?
                </Link>

              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
