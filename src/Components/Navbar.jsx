import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assest/logo.jpeg";

const Navbar = () => {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname);
  const borderRef = useRef(null);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    const activeLinkElement = document.querySelector(`a[href='${activeLink}']`);

    if (activeLinkElement && borderRef.current) {
      const { offsetLeft, offsetWidth } = activeLinkElement;
      borderRef.current.style.left = `${offsetLeft}px`;
      borderRef.current.style.width = `${offsetWidth}px`;
    }
  }, [activeLink]);

  return (
    <div className="p-4 bg-[#FFFFFF] relative flex items-center">
      <div className="flex flex-col items-center justify-start w-40 h-14 ">
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex text-[#0F1E54] text-[14px] ">
        <div className="flex">
          {/* <Link
            to="/dashbord"
            className={`px-4 cursor-pointer ${
              pathname === "/" ? "font-bold text-[#0F1E54]" : ""
            }`}
            onClick={() => handleLinkClick("/")}
          ></Link> */}
          {/* <Link
            to="/"
            className={`px-4 cursor-pointer ${
              pathname === "/dashbord" ? "font-bold text-[#0F1E54]" : ""
            }`}
            onClick={() => handleLinkClick("/dashbord")}
          >
            Dashboard
          </Link> */}

          <Link
            to="/"
            className={`px-4 cursor-pointer ${
              pathname === "/" ? "font-bold text-[#0F1E54]" : ""
            }`}
            onClick={() => handleLinkClick("/")}
          >
            Home
          </Link>
          <Link
            to="/customers"
            className={`px-4 cursor-pointer ${
              pathname === "/customers" ? "font-bold text-[#0F1E54]" : ""
            }`}
            onClick={() => handleLinkClick("/customers")}
          >
            Customer
          </Link>
          <Link
            to="/team"
            className={`px-4 cursor-pointer ${
              pathname === "/team" ? "font-bold text-[#0F1E54]" : ""
            }`}
            onClick={() => handleLinkClick("/team")}
          >
            Team
          </Link>
          <Link
            to="/member"
            className={`px-4 cursor-pointer ${
              pathname === "/member" ? "font-bold text-[#0F1E54]" : ""
            }`}
            onClick={() => handleLinkClick("/member")}
          >
            Member
          </Link>
          <Link
            to="/notification"
            className={`px-4 cursor-pointer ${
              pathname === "/notification" ? "font-bold text-[#0F1E54]" : ""
            }`}
            onClick={() => handleLinkClick("/notification")}
          >
            + Add Notification
          </Link>
          {/* <Link
            to="/settings"
            className={`px-4 cursor-pointer ${
              pathname === "/settings" ? "font-bold text-[#0F1E54]" : ""
            }`}
            onClick={() => handleLinkClick("/settings")}
          >
            Settings
          </Link> */}
        </div>
        {/* Border effect */}
        <span
          ref={borderRef}
          className={`absolute bottom-0 bg-[#567AFB] h-0.5 transition-all duration-300 ${
            pathname === activeLink ? "block" : "hidden"
          }`}
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
};

export default Navbar;
