import React, { useState } from "react";
import "./LoginStyle.css";
import user from "../../Images/user.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/Context";
import Loader from "../Loader/Loading";
function LoginCmp() {
  const navigate = useNavigate();

  const { setusername, setpassword, loginFunc, loading } = useGlobalContext();

  return (
    <>
      <div className="logincontainer">
        <div className="LoginFormContainer">
          <div className="LoginForm">
            <div className="LoginFormHeader">
              <img src={user} alt="user" />
              <h3 style={{ textDecoration: "underline" }}>Login</h3>
            </div>
            <div className="userInputDiv">
              <TextField
                onChange={(e) => setusername(e.target.value)}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setpassword(e.target.value)}
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
              />
            </div>
            <div className="loginBtn">
              {loading ? (
                <Loader />
              ) : (
                <Button
                  variant="contained"
                  className="loginBtnhandle"
                  onClick={(e) => loginFunc(e, navigate)}
                >
                  Submit{" "}
                </Button>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginCmp;
