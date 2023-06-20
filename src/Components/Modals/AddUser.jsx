import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Modal from "react-bootstrap/Modal";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
function AdduserModal() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = React.useState(false);
  const [haserror, setHaserror] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const addUserurl =
  //   "https://76gj7fuj1j.execute-api.us-east-1.amazonaws.com/post/loginusers";
    const addUserurl="https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/user"
    // const updateApi="https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/user"
    const apiKey = process.env.REACT_APP_KEY;
  const addUserFnc = async () => {
    if(username==="" || firstname===""|| password==="" || role===""){
      setHaserror(true);
      alert("Please fill all the fields");
    }
    else{
      
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
      userrole: role,
    };
    // console.log(data);
    const response = await fetch(addUserurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,

      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    if (json.body == "true") {
      setOpen(true);
      window.location.reload();
    } else if (json.body == "User already exists") {
      alert("User already exists");
    } else {
      alert("Something went wrong");
    }
  }
};
  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleShow}
        style={{ background: "green" }}
      >
        Add User
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="inneradduser"
            style={{ display: "flex", flexDirection: "column", gap: "22px" }}
          >
            <TextField
            error={haserror}
            helperText={haserror ? "Feilds are mandatory" : ""}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              
            />
            <TextField
              id="outlined-basic"
              label="Firstname"
              variant="outlined"
              value={firstname}
              error={haserror}
              helperText={haserror ? "Feilds are mandatory" : ""}
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
            error={haserror}
            helperText={haserror ? "Feilds are mandatory" : ""}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
            <FormControl variant="outlined" error={haserror}>
              <InputLabel id="demo-simple-select-outlined-label">
                Select Role
              </InputLabel>
              <Select
               
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Select Role"
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Agent"}>Agent</MenuItem>
              </Select>
              {haserror && <FormHelperText>These field are mandaatory</FormHelperText>}
            </FormControl>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ gap: "20px" }}>
          <Button variant="contained" color="success" onClick={addUserFnc}>
            Add
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClosed} severity="success" sx={{ width: "100%" }}>
          user added successfully
        </Alert>
      </Snackbar>
    </>
  );
}

export default AdduserModal;
