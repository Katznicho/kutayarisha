import React from "react";
import Widget1 from "../../components/dashboard/widget-1";
import Section from "../../components/dashboard/section";
import SectionTitle from "../../components/dashboard/section-title";
import { FiActivity, FiUsers, FiExternalLink, FiClock } from "react-icons/fi";
import { Line1 } from "../../components/dashboard/line-chart";
import Dropdown1 from "../../components/widgets/dropdown-1";

import { Timeline1 } from "../../components/timelines";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Index = () => {
  //use history hook
  const history = useHistory();
  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));
  const { users, userInfo } = {
    ...firebase,
  };
  //alert(userInfo)
  const doctors = users?.filter((user) =>
    user.data.role === "doctor" ? user : null
  );
  const verifiedUsers = users?.filter((user) =>
    user.data.verified ? user : null
  );

  const unVerifiedUsers = users?.filter((user) =>
    !user.data.verified ? user : null
  );

  const admins = users?.filter((user) => (user.data.isAdmin ? user : null));
  return (
    <>
      <SectionTitle title="Overview" subtitle="Dashboard" />
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        {/*widget*/}
        <div
          className="w-full lg:w-1/4"
          onClick={() => (window.location.href = "/users")}
        >
          <Widget1
            title="Total Savings"
            description={120000}
            color="bg-tunziblue"
            right={
              <FiUsers size={24} className="stroke-current text-grey-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Total Conributions"
            description={120000}
            color="bg-blue-600"
            right={
              <FiActivity size={24} className="stroke-current text-grey-500" />
            }
          />
        </div>
        {/*widget*/}
        {userInfo?.isAdmin && (
          <div
            className="w-full lg:w-1/4 "
            onClick={() => (window.location.href = "/verify-page")}
          >
            <Widget1
              title="Verified Users"
              description={verifiedUsers.length}
              color="bg-green-600"
              right={
                <FiExternalLink
                  size={24}
                  className="stroke-current text-grey-500"
                />
              }
            />
          </div>
        )}

        {userInfo?.isAdmin && (
          <div className="w-full lg:w-1/4">
            <Widget1
              title="Unverified Users"
              description={unVerifiedUsers.length}
              right={
                <FiClock size={24} className="stroke-current text-grey-500" />
              }
              color="bg-red-600"
            />
          </div>
        )}

        {userInfo?.isAdmin && (
          <div className="w-full lg:w-1/4">
            <Widget1
              title="Unverified Users"
              description={unVerifiedUsers.length}
              right={
                <FiClock size={24} className="stroke-current text-grey-500" />
              }
              color="bg-red-600"
            />
          </div>
        )}

        {userInfo?.isAdmin && (
          <div
            className="w-full lg:w-1/4"
            onClick={() => (window.location.href = "/admins")}
          >
            <Widget1
              title="Admins"
              description={admins.length}
              right={
                <FiClock size={24} className="stroke-current text-grey-500" />
              }
              color="bg-yellow-600"
            />
          </div>
        )}

        {/*widget*/}
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/3">
          <Section
            title="Sales"
            description={<span>This month</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              <Line1 />
            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/3">
          <Section
            title="Tasks"
            description={<span>As asigned</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              <Timeline1 />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};
export default Index;
