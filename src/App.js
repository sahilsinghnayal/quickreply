import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Addreply from "./Components/Addreplycomp/Addreply";
import ViewReply from "./Components/ViewReplyComp/ViewReply";
import LoginCmp from "./Components/Login/LoginComponent";
import Usermanagement from "./Components/Usermanagement/Usermanagement";
import { useGlobalContext } from "./Context/Context";
import UserProfile from "./Components/Userprofile/UserProfile";
function App() {
  const { loginToken, rolesAdmn } = useGlobalContext();
  const Protectedlogin = () => {
    const isAuth = loginToken;

    if (isAuth) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };
  const ProtectedAdmin = () => {
    const isAuth2 = rolesAdmn;

    if (isAuth2) {
      return <Outlet />;
    } else {
      return <Navigate to="/addreply" />;
    }
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginCmp />} />
          <Route element={<Protectedlogin />}>
            <Route path="/addreply" element={<Addreply />} />
          </Route>
          <Route path="/viewreply" element={<ViewReply />} />

          <Route element={<ProtectedAdmin />}>
            <Route path="/usermanagement" element={<Usermanagement />} />
          </Route>
          <Route element={<Protectedlogin />}>
            <Route path="/userprofile" element={<UserProfile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
