import React from "react";
import { useSelector, shallowEqual } from "react-redux";

const Text = () => {
  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  let { name } = { ...config };
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold mb-4">Welcome to {name}!</p>
      <p className="text-sm font-thin">
      kutayarish is a goal based solution that enables pregnant women to 
             plan for their maternity period and delivery times  through  savings and creating 
             campaigns
      </p>
    </div>
  );
};
export default Text;
