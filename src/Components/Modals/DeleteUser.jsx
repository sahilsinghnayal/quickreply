import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";

import { Typography } from "@mui/material";
import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
function MyVerticallyCenteredModal(props) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState(props.item.username);
  // const deleteapi = `https://76gj7fuj1j.execute-api.us-east-1.amazonaws.com/post/loginusers?username=${username}`;
const deleteapi=`https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/user?username=${username}`
const apiKey = process.env.REACT_APP_KEY;
  const deleteFnc = () => {
    console.log("delete");
    fetch(deleteapi, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.msg == "item has been deleted") {
          setOpen(true);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            Delte User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography variant="h6" gutterBottom component="div" >
            Are you sure you want to delete <b> {props.item.username} </b>
            Profile?
          </Typography>
        </Modal.Body>
        <Modal.Footer style={{ gap: "15px" }}>
          <Button variant="contained" color="success" onClick={deleteFnc}>
            delete
          </Button>
          <Button variant="contained" color="error" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DeleteUser({ item }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {/* <Button className="editbtn" onClick={() => setModalShow(true)}>
        Edit
      </Button> */}
      <Button onClick={() => setModalShow(true)}>
        <DeleteIcon style={{ color: "red" }} />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
      />
    </>
  );
}

export default DeleteUser;
