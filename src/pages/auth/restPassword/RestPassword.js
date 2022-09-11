import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearErrors,
  clearMessage,
  createMessage,
  reset_password,
} from "../../../actions/authAction";
import { Button, Form, Input, Loader } from "../../../components";
import { Alert } from "../../../components/common/Alert";
import Layout from "../../../layouts/centered";
import { ForgotSection } from "../forgotPassword/ForgotSection";

export default function RestPassword() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const { rest_loading, rest_success, message, reason, error } = useSelector(
    (state) => state.auth
  );
  const [values, setValues] = React.useState({
    username: "",
    new_password: "",
  });
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleClearForm = () => {
    setValues({
      username: "",
      new_password: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.new_password && values.username) {
      dispatch(reset_password(values));
    } else {
      dispatch(
        createMessage(
          "Please fill up the fields for a confirmation",
          "fields_required"
        )
      );
    }
    handleClearForm();
  };
  React.useEffect(() => {
    if (error) {
      setErrorMessage(error.non_field_errors?.toString());
    } else {
      setErrorMessage(null);
    }
  }, [error, setErrorMessage]);
  React.useEffect(() => {
    if (rest_success) {
      window.location.href = "/auth/login";
    }
  }, [dispatch, rest_success]);
  return (
    <Layout>
      <ForgotSection
        title="REST PASSWORD"
        subtitle="Please enter your new password to reset your account"
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

        {message && reason === "rest_successfull" ? (
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
          <Alert
            error="text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
            errorMessage={errorMessage}
            onClick={() => dispatch(clearErrors())}
          >
            {errorMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Enter your email"
            type="email"
            title="Email"
            width="w-full my-4"
            value={values.username}
            onChange={handleInputChange}
          />
          <Input
            name="new_password"
            placeholder="Enter your new password"
            type="text"
            title="New Password"
            width="w-full my-4"
            value={values.new_password}
            onChange={handleInputChange}
          />
          <Button
            text="Submit"
            type="submit"
            bg="btn btn-default bg-tunziblue hover:bg-tunziyellow text-white btn-rounded"
            icon={rest_loading && <Loader />}
          />
        </Form>
        <div className="w-full mt-2 flex flex-col gap-2">
          <span className="text-tunziblue">
            New user?
            <Link to="/auth/register" className="link pl-2">
              Sign up here
            </Link>
          </span>

          <span className="text-tunziblue">
            Already have an account?
            <Link to="/auth/login" className="text-textblue pl-2">
              login here
            </Link>
          </span>
        </div>
      </ForgotSection>
    </Layout>
  );
}
