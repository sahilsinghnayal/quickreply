import React from "react";
import Nav from "../NavbarCmp/NavbarCom";
import Sidebar from "../SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import "./ViewReply.css";
import Editmodal from "./Editmodal";
function ViewReply() {
  //fake json data two feilds
  const jsonData = [
    {
      category: "Category 1",
      reply: "Reply 1",
    },
    {
      category: "Category 2",
      reply: "Reply 2",
    },
    {
      category: "Category 3",
      reply: "Reply 3",
    },
    {
      category: "Category 4",       
      reply: "Reply 4",
    },
  ];

  return (
    <>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <Nav />
        <div
          className="containerViewReply"
          style={{ display: "flex", gap: "1rem" }}
        >
          <Sidebar />
          <div className="ViewReplyContainer">
            <div className="ViewReplyInner">
              <h3 style={{ fontWeight: 500, color: "#094058" }}>View Reply</h3>
              <div className="tablecontainer">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Reply</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jsonData.map((value, key) => {
                      return (
                        <tr key={value.category}>
                          <td>{value.category}</td>
                          <td>{value.reply}</td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <Editmodal value={value} />

                              <button className="deletebtn">Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewReply;
