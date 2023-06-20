import React from "react";
import Sidebar from "../SideBar/Sidebar";
import NavbarComp from "../NavbarCmp/NavbarCom";
import "./AddReplyStyle.css";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import CircularIndeterminate from "../Loader/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addreply() {
  const [loading, setLoading] = React.useState(false);
  const [reply, setReply] = React.useState([]);
  const [category, setCategory] = React.useState([]);

  const addreply =
    "https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/qna";
  const apiKey = process.env.REACT_APP_KEY;
  const addReply = () => {
    if (category.length === 0 || reply.length === 0) {
      // alert("Please fill all the fields");
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "red",
          color: "#ffffff",
        },
      });
    } else {
      setLoading(true);
      fetch(addreply, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          category: category,
          reply: reply,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.statusCode === 200){
            toast.success("Data added sucessfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                background: "green",
                color: "#ffffff",
              },
            });
          }
           
          // enqueueSnackbar('added succesfully!', { success: true });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <NavbarComp />
        <div className="containeraddreply">
          <Sidebar />
          <div className="addreplycontainer">
            {loading ? (
              <CircularIndeterminate />
            ) : (
              <div className="addreplyinner">
                <h3 style={{ fontWeight: 500, color: "#094058" }}>Add Reply</h3>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Write Category"
                    variant="outlined"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={10}
                    placeholder="Write your Quick reply here"
                    style={{ width: 500 }}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </div>
                <div>
                  <Button
                    variant="contained"
                    className="submitBtn"
                    style={{ background: "#094058" }}
                    onClick={addReply}
                  >
                    Submit
                  </Button>
                  <ToastContainer />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Addreply;
