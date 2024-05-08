import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Simulating user authentication check
  useEffect(() => {
    const token = localStorage.getItem("login");
    if (!token) {
      navigate("/login");
    }
  }, []);

  //  (!token) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="flex min-h-screen ">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4">
          <Outlet />
          {/* Dashboard content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
