import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./admin.scss";
import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";

const Admin = () => {
  const [close, setClose] = useState(false);
  return (
    <div className={`admin ${close ? "admin__close" : ""}`}>
      <div className="admin__sidebar">
        <Sidebar />
      </div>
      <div className="admin__bg ">
        <div className="admin__bg-top">
          <Menu setClose={setClose} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
