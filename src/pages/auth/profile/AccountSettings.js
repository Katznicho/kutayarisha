import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../../../actions/authAction";
import { Button, Form, Input, Loader, Select } from "../../../components";
import useForm from "../../../hooks/useForm";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));

  let { userInfo, profile_loading } = {
    ...auth,
  };
  const { profile, setProfile, handleInputChange, handleClearForm } = useForm();

  React.useEffect(() => {
    if (userInfo) {
      setProfile(userInfo);
    }
  }, [setProfile, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.id) {
      dispatch(profileData(userInfo.id, profile));
    }
    handleClearForm();
  };
  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit} className="flex flex-col w-full mb-4">
        <div className="w-full grid grid-cols-2 space-x-8">
          <div className="mb-2">
            <Input
              title="Account Type"
              placeholder="Enter your account type"
              type="text"
              name="account_type"
              disabled
              onChange={handleInputChange}
              value={profile.account_type}
              width="w-full my-4"
            />
            <Input
              title="Address"
              placeholder="Enter your address"
              name="address"
              type="text"
              onChange={handleInputChange}
              value={profile.address}
              width="w-full my-4"
            />
            <Input
              title="Contact"
              placeholder="Enter your contact"
              type="text"
              name="contact"
              onChange={handleInputChange}
              value={profile.contact}
              width="w-full my-4"
            />
            <Input
              title="Email"
              placeholder="Enter your email"
              name="username"
              type="text"
              onChange={handleInputChange}
              value={profile.username}
              width="w-full my-4"
            />
            <Input
              title="First Name"
              placeholder="Enter your first name"
              name="first_name"
              type="text"
              onChange={handleInputChange}
              value={profile.first_name}
              width="w-full my-4"
            />
          </div>
          <div className="mb-2">
            <Input
              title="Last Name"
              placeholder="Enter your last name"
              type="text"
              name="last_name"
              onChange={handleInputChange}
              value={profile.last_name}
              width="w-full my-4"
            />
            <Input
              title="Farm Id"
              placeholder="Enter your farm id"
              type="text"
              name="farm_id"
              onChange={handleInputChange}
              value={profile.farm_id}
              width="w-full my-4"
            />
            <Select
              title="Gender"
              placeholder="Enter your gender"
              name="gender"
              type="text"
              onChange={handleInputChange}
              value={profile.gender}
              width="w-full my-4"
            >
              <option disabled>Choose gender ...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <Input
              title="Nin"
              placeholder="Enter your nin"
              type="text"
              name="nin"
              onChange={handleInputChange}
              value={profile.nin}
              width="w-full my-4"
            />
          </div>
        </div>
        <Button
          text="Submit"
          type="submit"
          bg="btn btn-default bg-tunziblue  text-white btn-rounded hover:bg-tunziyellow"
          icon={profile_loading && <Loader />}
        />
      </Form>
    </div>
  );
}
