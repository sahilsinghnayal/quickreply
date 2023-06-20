import React from "react";

import "./UserProfile.css";

import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/Context";

import Nav from "../NavbarCmp/NavbarCom";

import Sidebar from "../SideBar/Sidebar";
import EdituserProfilemodal from "../Modals/EdituserProfile";

function UserProfile() {
  const navigate = useNavigate();
  const { loginuserdetails } = useGlobalContext();
  console.log(loginuserdetails, "loginuserdetails");
  var username = localStorage.getItem("username");
  var firstname = localStorage.getItem("firstname");
  var lastname = localStorage.getItem("lastname");
  var role = localStorage.getItem("role");
  var password = localStorage.getItem("password");
  console.log(username, "username");
  console.log(firstname, "firstname");
  console.log(lastname, "lastname");
  console.log(role, "role");
  console.log(password, "password");
  return (
    <>
      <div className="userProfilecontainer">
        <Nav />
        <div className="containerflex">
          <Sidebar />
          <div className="userProfilecontent">
            <div className="headers">
              <h2>User Profile</h2>
            </div>
            <div className="innercontent">
              <div className="userImgcontainer">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="userImg"
                />
                {/* <Editusermodal/> */}
              </div>
              <div className="Editbtn">
                <p>Edit</p>
                <EdituserProfilemodal item={loginuserdetails} />
                {/* <EditIcon style={{ color: "orange" }} /> */}
              </div>
              <div className="userInformation">
                <div className="containerinfo">
                  <p>Username : {username}</p>
                  <p>Firstname :{firstname}</p>
                  <p>Lastname : {lastname}</p>
                  <p>Role : {role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
