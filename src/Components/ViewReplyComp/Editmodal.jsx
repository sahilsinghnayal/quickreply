import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ViewReply.css";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
function MyVerticallyCenteredModal(props) {
  const [categorys, setcategorys] = useState(props.value.category);
  const [replys, setreplys] = useState(props.value.reply);

  const url = "https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/qna";
  const apiKey = process.env.REACT_APP_KEY;
  const updateFnc = () => {
    console.log("update");
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,

      },
      body: JSON.stringify({
        category: categorys,
        reply: replys,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.msg == "item has been updated") {
          // setOpen(true);
            // window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Reply</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "end",
        }}
      >
        <h4>{props.value.category}</h4>
        <TextField id="standard-basic" label="Edit Reply" variant="standard" onChange={(e)=>setreplys(e.target.value)}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={updateFnc}>
          Update
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Editmodal({ value }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button className="editbtn" onClick={() => setModalShow(true)}>
        Edit
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        value={value}
      />
    </>
  );
}

export default Editmodal;
