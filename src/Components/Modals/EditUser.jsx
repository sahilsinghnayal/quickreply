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

function MyVerticallyCenteredModal(props) {

  const [username, setUsername] = useState(props.item.username);
  const [firstname, setFirstname] = useState(props.item.firstname);
  const [lastname, setLastname] = useState(props.item.lastname);
  const [role, setRole] = useState(props.item.userrole);
  const [password, setPassword] = useState(props.item.password);
  const [haserror, setHaserror] = useState(false);
  const [open, setOpen] = React.useState(false);
 const updateApi="https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/user"
  const apiKey = process.env.REACT_APP_KEY;
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
          window.location.reload();

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
          <FormControl fullWidth error={haserror}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Agent"}>Agent</MenuItem>
              {haserror && <FormHelperText>These field are mandaatory</FormHelperText>}
           
            </Select>
          </FormControl>
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

function Editusermodal({ item }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {/* <Button className="editbtn" onClick={() => setModalShow(true)}>
        Edit
      </Button> */}
      <Button onClick={() => setModalShow(true)}>
        <EditIcon style={{ color: "orange" }} />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
      />
    </>
  );
}

export default Editusermodal;
