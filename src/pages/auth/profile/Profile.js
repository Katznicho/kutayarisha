import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Widget from "../../../components/social-feed/widget";
import AccountSettings from "./AccountSettings";
import SecuritySettings from "./SecuritySettings";

const tabs = [
  {
    index: 0,
    title: "Account settings",
    content: <AccountSettings />,
  },

  {
    index: 1,
    title: "Security settings",
    content: <SecuritySettings />,
  },
];
const UnderlinedTabs = ({ tabs }) => {
  const [openTab, setOpenTab] = React.useState(0);
  return (
    <div className="flex flex-wrap flex-col w-full tabs">
      <div className="flex lg:flex-wrap flex-row space-x-8 ">
        {tabs.map((tab, key) => (
          <div key={key} className="flex-none">
            <button
              onClick={() => {
                setOpenTab(tab.index);
              }}
              className={
                openTab === tab.index
                  ? "tab tab-underline tab-active"
                  : "tab tab-underline"
              }
              type="button"
            >
              <h6 className="hover:underline underline-offset-8 font-bold text-sm text-tunziblue">
                {tab.title}
              </h6>
            </button>
          </div>
        ))}
      </div>
      {tabs.map((tab, key) => (
        <div
          key={key}
          className={`tab-content ${
            openTab !== tab.index ? "hidden" : "block"
          }`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

const Profile = () => {
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const { userInfo } = {
    ...auth,
  };
  return (
    <Widget>
      <div className="flex flex-row items-center justify-start p-4">
        <div className="flex-shrink-0 w-24">
          <img
            src="/assets/faces/m1.png"
            alt="media"
            className="shadow rounded-full h-20 w-20 shadow-outline mb-2"
          />
        </div>
        {userInfo && (userInfo !== null) & (userInfo !== undefined) ? (
          <>
            <div className="py-2 px-2">
              <h4 className="text-base font-bold whitespace-no-wrap text-textblue">
                {userInfo?.first_name + " " + userInfo?.last_name}
              </h4>

              <p className="text-sm text-yellow-700 whitespace-no-wrap">
                {userInfo?.account_type}
              </p>
              <p className="text-sm text-grey-500 whitespace-no-wrap">
                {userInfo?.username}
              </p>
            </div>
            <div className="ml-auto flex-shrink-0 space-y-2">
              <p className="text-sm text-grey-500 whitespace-no-wrap">
                Last logged in : {moment(userInfo?.last_login).fromNow()}
              </p>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap">
        <div className="w-full p-4">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </Widget>
  );
};

export default Profile;
