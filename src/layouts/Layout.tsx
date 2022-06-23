import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componets/Navbar";

const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
