import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../../layouts/centered";
import { Button, Form, Input, Loader } from "../../../components";
import { ForgotSection } from "./ForgotSection";
import { useDispatch, useSelector } from "react-redux";
import { forgotpasswordAction } from "../../../actions/forgotPasswordAction";
import { Alert } from "../../../components/common/Alert";
import { FiAlertCircle } from "react-icons/fi";
import {
  clearErrors,
  clearMessage,
  createMessage,
} from "../../../actions/authAction";
const initialState = {
  name: "",
  email: "",
};
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [values, setValues] = React.useState(initialState);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { auth, forgotPassword } = useSelector((state) => ({
    forgotPassword: state.forgotPassword,
    auth: state.auth,
  }));

  const { message, reason } = { ...auth };
  const { loading, success, error } = {
    ...forgotPassword,
  };

  React.useEffect(() => {
    if (success) {
      dispatch(
        createMessage(
          "Please check your email or spam folder for confirmation code",
          "confirmation_code"
        )
      );
      window.location.href = "/auth/confirmation-code";
    }
  }, [dispatch, success]);

  React.useEffect(() => {
    if (error) {
      if (error?.detail) {
        setErrorMessage(error?.detail);
      } else {
        setErrorMessage(error);
      }
    } else {
      setErrorMessage(null);
    }
  }, [error, setErrorMessage]);

  const handleClearForm = () => {
    setValues(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name && values.email) {
      dispatch(forgotpasswordAction(values));
    } else {
      dispatch(
        createMessage(
          "Please fill up the fields for a password rest",
          "fields_required"
        )
      );
    }
    handleClearForm();
  };

  return (
    <Layout>
      <ForgotSection
        title="Forgot password"
        subtitle="Please enter your email address to recover your password"
      >
        {message && reason === "fields_required" ? (
          <div className="w-full mb-4">
            {(message !== null || message !== undefined) && (
              <Alert
                error={`text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`}
                icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
                onClick={() => dispatch(clearMessage())}
              >
                {message}
              </Alert>
            )}
          </div>
        ) : null}

        {message && reason === "unauthorized" ? (
          <div className="w-full mb-4">
            {(message !== null || message !== undefined) && (
              <Alert
                error={`text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`}
                icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
                onClick={() => dispatch(clearMessage())}
              >
                {message}
              </Alert>
            )}
          </div>
        ) : null}

        {message && reason === "confirmation_code" ? (
          <div className="w-full mb-4">
            {(message !== null || message !== undefined) && (
              <Alert
                error={`text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800`}
                icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
                onClick={() => dispatch(clearMessage())}
              >
                {message}
              </Alert>
            )}
          </div>
        ) : null}

        {errorMessage && (
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
        )}
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Enter your name"
            type="text"
            title="Name"
            width="w-full my-4"
            value={values.name}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            placeholder="Enter your email"
            type="email"
            title="Email"
            width="w-full my-4"
            value={values.email}
            onChange={handleInputChange}
          />
          <Button
            text="Submit"
            type="submit"
            bg="btn btn-default bg-tunziblue hover:bg-tunziyellow text-white btn-rounded"
            icon={loading && <Loader />}
          />
        </Form>
        <div className="w-full mt-2">
          <span>
            <Link to="/auth/login" className="text-textblue">
              Go back to login
            </Link>
          </span>
        </div>
      </ForgotSection>
    </Layout>
  );
};

export default ForgotPassword;
