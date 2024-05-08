import React from "react";
import menu from "../Assest/Icon/menu.png";
import groupIcon from "../Assest/Icon/Group icon.png";
import notification from "../Assest/Icon/Notifications.png";

function Sidebar() {
  return (
    <div className="flex flex-col items-center justify-start w-20 bg-[#FFFFFF]">
      <div className="pt-4 mb-8">
        <img src={menu} alt="menu" />
      </div>
      <ul className="p-2">
        <li className="flex items-center px-4 py-2 cursor-pointer">
          <img src={groupIcon} alt="group-icon" />
        </li>
        <li className="flex items-center px-4 py-2 cursor-pointer">
          <img src={notification} alt="notification" />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
