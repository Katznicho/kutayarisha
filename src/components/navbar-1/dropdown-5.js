import React, { useState, useEffect, useRef } from "react";
import AccountLinks from "./account-links";

const Dropdown = ({ active }) => {
  const [hidden, setHidden] = useState(true);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        dropdownRef.current.contains(event.target)
      ) {
        return false;
      }
      setHidden(!hidden);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hidden, dropdownRef, buttonRef]);

  const handleDropdownClick = () => {
    setHidden(!hidden);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="flex h-16 w-8 rounded-full ml-2 relative  items-center justify-center"
      >
        <span className="relative ">
          <img
            className="h-8 w-8 rounded-full shadow"
            src={`/images/faces/m1.png`}
            alt="avatar"
          />
          {active !== null && active !== undefined ? (
            <span className="flex h-3 w-3 absolute right-0 top-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          ) : null}
        </span>
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown absolute top-0 right-0 mt-16 ${
          hidden ? "" : "open"
        }`}
      >
        <div className="dropdown-content w-48 bottom-end">
          <AccountLinks />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
