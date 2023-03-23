import React from "react";
import Sidebar from "../SideBar/Sidebar";
import NavbarComp from "../NavbarCmp/NavbarCom";
import "./AddReplyStyle.css";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
function Addreply() {
  return (
    <>
    <div style={{height:"100vh",overflow:"hidden"}}>
    <NavbarComp />
      <div className="containeraddreply">
        <Sidebar />
        <div className="addreplycontainer">
          <div className="addreplyinner">
            <h3 style={{fontWeight:700,textDecoration:"underline"}}>Add Reply</h3>
            <div>
              <TextField
                id="outlined-basic"
                label="Add Category"
                variant="outlined"
              />
            </div>
            <div>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Write your Quick reply here"
                style={{ width: 500 }}
              />
            </div>
            <div>
                <Button variant="contained">Submit</Button>
                </div>
          </div>
        </div>
      </div>
    </div>
     
    </>
  );
}

export default Addreply;
