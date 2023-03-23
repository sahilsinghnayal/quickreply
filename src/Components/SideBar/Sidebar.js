import React from "react";
import SidebarData from "./SidebarData";
import "./SidebarStyle.css";
function Sidebar() {
  
 
  return (
    <div className="sidebarContainer">
      <div className="sidebarInner">
        <SidebarData
          label="Add reply"
         
         
        />
        <SidebarData
          label="View reply "
         
         />
      </div>
    </div>
  );
}

export default Sidebar;
