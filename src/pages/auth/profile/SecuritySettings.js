import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Loader } from "../../../components";
import useForm from "../../../hooks/useForm";
import {
  changeUserPassword,
  clearErrors,
  clearMessage,
  createMessage,
} from "../../../actions/authAction";
import { Alert } from "../../../components/common/Alert";
import { FiAlertCircle } from "react-icons/fi";

export default function SecuritySettings() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const { password_loading, error, message, reason, success_message } =
    useSelector((state) => state.auth);

  const { passwordRest, handleInputChange, showPassword, handleShowPassword } =
    useForm();

  React.useEffect(() => {
    if (error) {
      setErrorMessage(error?.detail);
    } else {
      setErrorMessage(null);
    }
  }, [error, setErrorMessage]);

  React.useEffect(() => {
    if (success_message) {
      dispatch(
        createMessage(
          "Password has been changed successfully",
          "password_change"
        )
      );
    }
  }, [dispatch, success_message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRest.new_password && passwordRest.old_password) {
      dispatch(changeUserPassword(passwordRest));
    } else {
      dispatch(
        createMessage(
          "Old password is required to change new password",
          "old_password_required"
        )
      );
    }
  };

  return (
    <div className="w-full lg:w-1/2">
      <>
        {message && reason === "old_password_required" ? (
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

        {message && reason === "password_change" ? (
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

        {errorMessage ? (
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
        ) : null}
      </>
      <Form onSubmit={handleSubmit} className="flex flex-col w-full mb-4">
        <div className="mb-2">
          <Input
            title="Old Password"
            placeholder="Enter your old password"
            name="old_password"
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            value={passwordRest.old_password}
            width="w-full my-4"
          />
          <Input
            title="New Password"
            placeholder="Enter your new password"
            name="new_password"
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            value={passwordRest.new_password}
            width="w-full my-4"
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
        </div>
        <Button
          text="Submit"
          type="submit"
          bg="btn btn-default bg-tunziblue  text-white btn-rounded hover:bg-tunziyellow"
          icon={password_loading && <Loader />}
        />
      </Form>
    </div>
  );
}
