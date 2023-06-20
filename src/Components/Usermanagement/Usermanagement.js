import React, { useEffect } from "react";
import Nav from "../NavbarCmp/NavbarCom";
import Sidebar from "../SideBar/Sidebar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Table from "react-bootstrap/Table";
import "../Usermanagement/Usermangement.css";
import Editusermodal from "../Modals/EditUser";
import AdduserModal from "../Modals/AddUser";
import DeleteUser from "../Modals/DeleteUser";
import { Navigate, useNavigate } from "react-router-dom";
function Usermanagement() {
  
  const [data, setData] = React.useState([]);
  const [inputdata, setinputdata] = React.useState("");
  const [displaydata, setdisplaydata] = React.useState([]);
  const[loading,setLoading]=React.useState(false);
  const navigate = useNavigate();
  const searchHandle = (e) => {
    setinputdata(e);
    const results = data.filter((item) =>
    Object.values(item)
    .join(' ')
    .toLowerCase()
    .includes(e.toLowerCase())
    );
    setdisplaydata(results);
  };
   const dummy = [
    {
      username: "sahilsinghnayal1@gmail.com",
      firstname: "Sahil",
      lastname: "singh",
      role: "Admin",
    },
    {
      username: "rohankumar2@gmail.com",
      firstname: "Rohan",
      lastname: "kumar",

      role: "Agent",
    },
    {
      username: "saurabhsing3h@gmail.com",
      firstname: "saurabh",
      lastname: "singh",

      role: "Agent",
    },
    {
      username: "kamranakhtar4@gmail.com",
      firstname: "kamran",
      lastname: "akhtar",

      role: "Agent",
    },
    {
      username: "rohankumar5@gmail.com",
      firstname: "Rohan",
      lastname: "kumar",

      role: "Agent",
    },
    {
      username: "saurabhsingh6@gmail.com",
      firstname: "saurabh",
      lastname: "singh",

      role: "Agent",
    },
    {
      username: "robin@gmail.com",
      firstname: "robin",
      lastname: "kumar",

      role: "Agent",
    },{
      username: "vedik@yahoo.in",
      firstname: "vedik",
      lastname: "kumarsharma",
      role: "Agent",
    },
    {
      username: "vedik@yahoo.in",
      firstname: "vedik",
      lastname: "kumarsharma",
      role: "Agent",
    },
    {
      username: "vedik@yahoo.in",
      firstname: "vedik",
      lastname: "kumarsharma",
      role: "Agent",
    }
  ];
  const lisuserApi =
  "https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/user";
  const apiKey = process.env.REACT_APP_KEY;
  const headers = new Headers();
  headers.append("x-api-key", apiKey);
  const request = new Request(lisuserApi, {
    method: "GET",
    headers: headers,
  });
  useEffect(() => {
    setLoading(true);
    const fetchdata = async () => {
      // console.log("fetching data");
      const res = await fetch(request);
      const data = await res.json();
      // console.log(data.items);
      if (data.StatusCode === 200) {
        setData(data.items);
        setdisplaydata(data.items);
      } else {
        console.log("error");
      }
      setLoading(false);
    };
    fetchdata();
  }, []);
  return (
    <div style={{ height: "100vh", overflow:'hidden'}}>
      <Nav />
      <div className="usermanagementcontainer">
        <Sidebar />
        <div className="userprofilecontainer">

      
        <div className="innerUsermanagement">
          <div className="searchBarAndAddUserBtn">
            
            <div className="searchbar">
              <TextField id="standard-basic" label="search" variant="filled"   onChange={(e) => searchHandle(e.target.value)} />
              <Button variant="contained">
                {" "}
                <SearchIcon />
              </Button>
            </div>
            <div className="adduserbtn">
              <AdduserModal />
            </div>
          </div>
          <div className="tables">
            {
              loading ? <p>Loading......</p> :   <Table striped bordered hover responsive>
              <thead style={{ background: "#252240", color: "white" }}>
                <tr>
                  <th>Username</th>
                  <th>Firstname</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ fontWeight: 600 }}>
                {displaydata.map((item) => {
                  return (
                    <tr key={item.username}>
                      <td>{item.username}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.userrole}</td>

                      <td>
                        <Editusermodal item={item} />

                        <Button>
                          <DeleteUser item={item} />
                        </Button>
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
  );
}

export default Usermanagement;
