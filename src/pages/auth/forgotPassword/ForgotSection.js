import React from "react";

export const ForgotSection = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col p-8 w-full max-w-xl">
      <div className="flex flex-col w-full mb-4">
        <div className="text-xs uppercase">
          <h2 className="font-bold text-sm text-textblue">{title}</h2>
        </div>
        <div className="text-lg font-bold">
          <p className="font-bold text-xs text-tunziyellow">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
