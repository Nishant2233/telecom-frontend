import "./App.css";
import Dashbord from "./Components/Dashbord";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Customer from "./Pages/Customer";
import Team from "./Pages/Team";
import Notification from "./Pages/Notification";
import Setting from "./Pages/Setting";
import AddCustomer from "./Pages/AddCustomer";
import DashBordPage from "./Pages/DashBordPage";
import AddTeam from "./Pages/AddTeam";
// import React, { useEffect, useState } from "react";
import Member from "./Pages/Member";
import AddMember from "./Pages/AddMembar";
import Login from "./Pages/Login";
// import { Twilio } from "twilio";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" exact element={<Dashbord />}>
            <Route path="/" element={<DashBordPage />} />

            <Route path="/customers" element={<Customer />} />
            <Route path="/team" element={<Team />} />
            <Route path="/member" element={<Member />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/customer/add-customer" element={<AddCustomer />} />
            <Route path="/team/add-team" element={<AddTeam />} />
            <Route path="/member/add-member" element={<AddMember />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
