import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarData from "./SidebarData";
import "./SidebarStyle.css";
import { useGlobalContext } from "../../Context/Context";

function Sidebar() {
  const navigate = useNavigate();
  const {  rolesAdmn } = useGlobalContext();
  
  return (
    <div className="sidebarContainer">
      <div className="sidebarInner">
        <SidebarData label="Add reply" func={() => navigate("/addreply")} />
        <SidebarData
          label="View reply "
          func={() => navigate("/viewreply")}
        />
        <SidebarData label="User Profile" func={() => navigate("/userprofile")} />
        {
          rolesAdmn ? 
          <SidebarData label="Admin" func={() => navigate("/usermanagement")} /> : null
        }
      </div>
    </div>
  );
}

export default Sidebar;
