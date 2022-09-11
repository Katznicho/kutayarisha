import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Login,
  NotFound,
  ForgotPassword,
  Dashboard,
  CodeVerification,
  RestPassword,
  Profile,
  Users,
  VerifyPage,
  Doctors,
  Blog,
  Admins,
} from "./pages";
import { AuthenticationRoute } from "./components";

import CreateAccountPage from "./pages/auth/createaccount/createaccount";
const Routes = () => {
  return (
    <Switch>
      <AuthenticationRoute exact path="/dashboard" component={Dashboard} />
      <AuthenticationRoute exact path="/" component={Dashboard} />
      <AuthenticationRoute path="/users" component={Users} />
      <AuthenticationRoute path="/user-profile" component={Profile} />
      <AuthenticationRoute path="/verify-page" component={VerifyPage} />
      <AuthenticationRoute path="/doctors" component={Doctors} />
      <AuthenticationRoute path="/blogs" component={Blog} />
      <AuthenticationRoute path="/admins" component={Admins} />

      
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/create-account" component={CreateAccountPage} />

      {/* <Route path="/auth/create-account" component={CreateAccountPage} /> */}
      <Route path="/auth/forgot-password" component={ForgotPassword} />
      <Route path="/auth/confirmation-code" component={CodeVerification} />
      <Route path="/auth/rest-password" component={RestPassword} />
      <Route path="/error-page" component={NotFound} />
    </Switch>
  );
};
export default Routes;
