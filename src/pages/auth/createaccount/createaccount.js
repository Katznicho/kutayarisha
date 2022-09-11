import React, { useEffect, useState } from "react";
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
import { useHistory } from "react-router-dom";

import { logo } from "../../../components/icons/icons";
import { FiAlertCircle } from "react-icons/fi";
import {
  user_login,
  clearMessage,
  createMessage,
  clearErrors,
  get_user_data,
  create_user,
} from "../../../actions/firebaseAction";

const CreateAccountPage = () => {
  //email state
  const [email, setEmail] = useState("");
  //password state
  const [password, setPassword] = useState("");
  //confirm password state
  const [confirmPassword, setConfirmPassword] = useState("");
  //name state
  const [names, setNames] = useState('');
  //phone state
  const [phone, setPhone] = useState('');
  //loading
  const [loading, setLoading] = useState(false);

  //use history hook
  const history = useHistory();

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
    handleClearMessage();
  }, []);

  // React.useEffect(() => {
  //   if (isAuthenticated) {
  //     if (user !== null || user !== undefined) {
  //       if (user) {
  //         window.location.href = "/dashboard";
  //       }
  //     }
  //   }
  // }, [dispatch, isAuthenticated, user]);

  React.useEffect(() => {
    if (userInfo) {
      if (userInfo !== null || userInfo !== undefined) {
        //userInfo.isAdmin
        if (userInfo.email) {
          //window.localStorage.setItem("first_time_login", JSON.stringify(true));
          //window.location.href = "/dashboard";
          history.push("/dashboard");
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
      //alert the email and password
      //alert(`Email: ${email} Password: ${password} Confirm Password: ${confirmPassword} Names: ${names} Phone: ${phone}`);
      //check if passwords match
      if(password !== confirmPassword){
        dispatch(createMessage("Password and Confirm Password do not match", "password_mismatch"));
        return;
      }
      //check if email is valid
      // if(!validateEmail(email)){
      //   dispatch(createMessage("Email is not valid", "invalid_email"));
      //   return;
      // }
      //check for empty fields
      if(email === '' || password === '' || confirmPassword === '' || names === ''){
        dispatch(createMessage("Please fill in all fields", "empty_fields"));
        return;
      }
      //check if phone number is 10 digits
      if(phone.length !== 10){
        dispatch(createMessage("Phone number must be 10 digits", "invalid_phone"));
        return;
      }
      if (email && password && confirmPassword && names && phone) {
         setLoading(true);
         
        const userInfo = {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          names: names,
          phone: phone,
        };
        dispatch(create_user(userInfo));
      } else {
        dispatch(createMessage("All fields are required", "login_fields"));
      }
    } 
    


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
            Create An Account with {name}
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
          {message && reason === "empty_fields" ? (
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
          {message && reason === "password_mismatch" ? (
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
                  title="Name"
                  placeholder="Enter your name"
                  type="text"
                  name="names"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  
                  width="w-full my-4"
                />
                <Input
                  title="Phone Number"
                  placeholder="Enter your phone number"
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  
                  width="w-full my-4"
                />
                <Input
                  title="Email"
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                
                  width="w-full my-4"
                />

                <Input
                  title="Password"
                  width="w-full my-4"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={
                    <div onClick={handleShowPassword}>
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </div>
                  }
                
                />

                <Input
                  title="Confirm Password"
                  width="w-full my-4"
                  placeholder="Confirm your password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? <Loader /> : "Register"}
              </button>
            </Form>

            <div className="w-full">
              <span>
                <Link className="text-textblue" to="/auth/login">
                  Back to Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccountPage;
