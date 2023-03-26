import React from "react";
import Button from "@mui/material/Button";
import "./SidebarStyle.css";
function SidebarData(props) {
  const { label,func} = props;

  return (
    <Button variant="text" className="sidebarButton" onClick={func}>
      {label}
    </Button>
  );
}

export default SidebarData;
