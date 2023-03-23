import React from "react";
import Button from "@mui/material/Button";
import "./SidebarStyle.css";
function SidebarData(props) {
  const { label } = props;

  return (
    <Button variant="text" className="sidebarButton">
      {label}
    </Button>
  );
}

export default SidebarData;
