import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarData from "./SidebarData";
import "./SidebarStyle.css";
function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebarContainer">
      <div className="sidebarInner">
        <SidebarData label="Add reply" func={() => navigate("/")} />
        <SidebarData
          label="View reply "
          func={() => navigate("/viewreply")}
        />
      </div>
    </div>
  );
}

export default Sidebar;
