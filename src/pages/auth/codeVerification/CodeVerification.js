import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearMessage,
  code_verification,
  createMessage,
} from "../../../actions/authAction";
import { Button, Form, Input, Loader } from "../../../components";
import { Alert } from "../../../components/common/Alert";

import Layout from "../../../layouts/centered";
import { ForgotSection } from "../forgotPassword/ForgotSection";
const initalCodeData = {
  code: "",
  username: "",
};
export default function CodeVerification() {
  const dispatch = useDispatch();
  const { code_loading, message, reason, success } = useSelector(
    (state) => state.auth
  );
  const [values, setValues] = React.useState(initalCodeData);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleClearForm = () => {
    setValues({
      code: "",
      username: "",
    });
  };

  React.useEffect(() => {
    if (success) {
      window.location.href = "/auth/rest-password";
    }
  }, [dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.code && values.username) {
      dispatch(code_verification(values));
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
  return (
    <Layout>
      <ForgotSection
        title="Code Verification"
        subtitle="Please enter your code and email to reset your password"
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

        {message && reason === "confirmation_true" ? (
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
        <Form onSubmit={handleSubmit}>
          <Input
            name="code"
            placeholder="Enter confirmation code"
            type="text"
            title="Confirmation Code"
            width="w-full my-4"
            value={values.code}
            onChange={handleInputChange}
          />
          <Input
            name="username"
            placeholder="Enter your email"
            type="email"
            title="Email"
            width="w-full my-4"
            value={values.username}
            onChange={handleInputChange}
          />
          <Button
            text="Submit"
            type="submit"
            bg="btn btn-default bg-tunziblue hover:bg-tunziyellow text-white btn-rounded"
            icon={code_loading && <Loader />}
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
}
