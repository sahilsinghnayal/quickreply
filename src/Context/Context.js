import React, { useContext, useState } from "react";

const AppContext = React.createContext();
function AppProvider({ children }) {
  const [loginToken, setloginToken] = useState(
    localStorage.getItem("token") || false
  );
  const [loading, setloading] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [rolesAdmn, setrolesAdmn] = useState(
    localStorage.getItem("roleAdmin") || false
  );
  const [loginuserdetails, setloginuserdetails] = useState({
    username: "",
    password:   "",
    role: "",
    firstname: "",
    lastname: "",
  });
  // const loginUrl = `https://76gj7fuj1j.execute-api.us-east-1.amazonaws.com/post/login?username=${username}&password=${password}`;
  const loginUrl = `https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/login?username=${username}&password=${password}`;

 
  const apiKey = process.env.REACT_APP_KEY;

  const headers = new Headers();
  headers.append("x-api-key", apiKey);
  const request = new Request(loginUrl, {
    method: "GET",
    headers: headers,
  });
  const loginFunc = async (e, navigate) => {
    setloading(true);
    e.preventDefault();
    const response = await fetch(request);
    const data = await response.json();
    setloading(false);
    console.log(data);
   
      
    
   

    setrolesAdmn(data.role);
    if (data.body === "true") {
      setloginuserdetails({
        //localstorage
        ...loginuserdetails,
        username: localStorage.setItem( "username",data.items.Item.username?data.items.Item.username:""),
        role: localStorage.setItem("role",data.items.Item.userrole?data.items.Item.userrole:"") ,
        firstname:localStorage.setItem("firstname", data.items.Item.firstname?data.items.Item.firstname:""),
        lastname: localStorage.setItem("lastname", data.items.Item.lastname?data.items.Item.lastname:""),
        password: localStorage.setItem("password",data.items.Item.password?data.items.Item.password:""),
      });
      localStorage.setItem("token", true);
      setloginToken(true);
      navigate("/addreply");
    } else {
      setloginToken(false);
      localStorage.removeItem("token");
      alert("Invalid Credentials");
    }
    if (data.role === "Admin") {
      setrolesAdmn(true);
      localStorage.setItem("roleAdmin", true);
    } else {
      setrolesAdmn(false);
      localStorage.removeItem("roleAdmin");
    }
  };
  // console.log(rolesAdmn, "roles");
  // useEffect(() => {
  //   console.log(loginToken, "loginToken");
  // }, [loginToken]);

  const logoutFunc = (navigate) => {
    setloginToken(false);
    localStorage.removeItem("token");
    localStorage.removeItem("roleAdmin");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("password");

    setrolesAdmn(false);
    navigate("/");
  };
  return (
    <AppContext.Provider
      value={{
        loginToken,
        setloginToken,
        username,
        setusername,
        password,
        setpassword,
        loginFunc,
        logoutFunc,
        loading,
        setloading,
        rolesAdmn,
        loginuserdetails,
        setloginuserdetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useGlobalContext };
