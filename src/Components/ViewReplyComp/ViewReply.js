import React, { useEffect, useState } from "react";
import Nav from "../NavbarCmp/NavbarCom";
import Sidebar from "../SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import "./ViewReply.css";
import Editmodal from "./Editmodal";
import DeleteCateogery from "../Modals/DeleteCateogery";
import Loader from "../Loader/Loading";
function ViewReply() {
  const [jsonData, setJsonData] = useState([]);
  const[loading,setLoading]=useState(false)
  //fake json data two feilds
  // const jsonData = [
  //   {
  //     category: "Category 1",
  //     reply: "Reply 1",
  //   },
  //   {
  //     category: "Category 2",
  //     reply: "Reply 2",
  //   },
  //   {
  //     category: "Category 3",
  //     reply: "Reply 3",
  //   },
  //   {
  //     category: "Category 4",
  //     reply: "Reply 4",
  //   },
  // ];
  const apiKey = process.env.REACT_APP_KEY;
  const url =
      "https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/qna";
  const headers = new Headers();
  headers.append("x-api-key", apiKey);
  const request = new Request(url, {
    method: "GET",
    headers: headers,
  });
  useEffect(() => {
  
    setLoading(true)
    fetch(request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJsonData(data.msg.Items);
        setLoading(false);
      });
  }, []);

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
                {
                  loading ? <p>Loading................</p>:  <Table striped bordered hover>
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
                              <DeleteCateogery value={value} />
                              {/* <button className="deletebtn">Delete</button> */}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                }
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewReply;
