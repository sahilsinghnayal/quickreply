import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useGlobalContext } from "../../Context/Context";

function MyVerticallyCenteredModal(props) {

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [firstname, setFirstname] = useState(localStorage.getItem("firstname"));
  const [lastname, setLastname] = useState(localStorage.getItem("lastname"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [haserror, setHaserror] = useState(false);
  const [open, setOpen] = React.useState(false);
  const updateApi="https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/user"
  const apiKey = process.env.REACT_APP_KEY;

  const{setloginuserdetails,loginuserdetails} =useGlobalContext();
  const loginUrl = `https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/login?username=${username}&password=${password}`;
  const headers = new Headers();
  headers.append("x-api-key", apiKey);
  const request = new Request(loginUrl, {
    method: "GET",
    headers: headers,
  });
  const loginFnc = async() => {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    if (data.body === "true") {
      setloginuserdetails({
        // localstorage
        ...loginuserdetails,
        username: localStorage.setItem( "username",data.items.Item.username?data.items.Item.username:""),
        role: localStorage.setItem("role",data.items.Item.userrole?data.items.Item.userrole:"") ,
        firstname:localStorage.setItem("firstname", data.items.Item.firstname?data.items.Item.firstname:""),
        lastname: localStorage.setItem("lastname", data.items.Item.lastname?data.items.Item.lastname:""),
        password: localStorage.setItem("password",data.items.Item.password?data.items.Item.password:""),

      });
      
    
      
    } else {
     
     alert("failure");
    }
  }
  const updateFnc = () => {
 
    if (username === "" || firstname === "" || password === "" || role === "") {
      alert("Please fill all the fields");
      setHaserror(true);
    } else {
    console.log("update");
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      userrole: role,
      password: password,
    };  
    
    console.log(data);
    //post data to api
    fetch(updateApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if(data.body=="true"){
          setOpen(true);
          loginFnc();
          
          setTimeout(() => {  
            setOpen(false);
            props.onHide();
          }, 1000);

          // window.location.reload();

        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  };
  const passwordHandlechange = (e) => {
    const hiddenValue = e.target.value;
    const visibleValue = hiddenValue.replace(/./g, "*");
    setPassword(hiddenValue);
    e.target.value = visibleValue;
  };
 
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            gap: "13px",
            flexDirection: "column",
            padding: "2rem",
            // alignItems: "end",
          }}
        >
          <TextField
           
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            
          />
          <TextField
          error={haserror}
          helperText={haserror ? "These fields are mandatory" : ""}
            id="outlined-basic"
            label="Firstname"
            variant="outlined"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Lastname"
            variant="outlined"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
         
          <TextField
            id="outlined-basic"
            label="Password"
            error={haserror}
            helperText={haserror ? "These fields are mandatory" : ""}
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer style={{ gap: "15px" }}>
          <Button variant="contained" color="success" onClick={updateFnc}>
            Update
          </Button>
          <Button variant="contained" color="error" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>
  );
}

function EdituserProfilemodal({ item }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      {/* <Button className="editbtn" onClick={() => setModalShow(true)}>
        Edit
      </Button> */}
      <EditIcon onClick={() => setModalShow(true)} style={{ color: "orange" }} />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
        
      />
    </>
  );
}

export default EdituserProfilemodal;
