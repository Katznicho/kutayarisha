import React from "react";
import {
  FiHome,
  FiLifeBuoy,
  FiAlertTriangle,
  FiBell,
  FiAirplay,
} from "react-icons/fi";

const initialState = [
  {
    title: "Dashboard",
    items: [
      {
        url: "/dashboard",
        icon: <FiHome size={20} />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/admins",
        icon: <FiAirplay size={20} />,
        title: "Admins",
        items: [],
      },
      {
        url: "/users",
        icon: <FiLifeBuoy size={20} />,
        title: "Users",
        items: [],
      },

      {
        url: "/doctors",
        icon: <FiAlertTriangle size={20} />,
        title: "Doctor",
        items: [],
      },
      {
        url: "/blogs",
        icon: <FiBell size={20} />,
        title: "Blogs",
        items: [],
      },
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
