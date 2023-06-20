import Navbar from "react-bootstrap/Navbar";
import "./NavBarStyle.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/Context";
function Nav() {
  const navigate = useNavigate();
  const { logoutFunc, rolesAdmn } = useGlobalContext();

  
  return (
    <Navbar className="Navbarcss">
      <p className="navhead">Quick Reply Builder</p>

      <p className="LogoutBtn" onClick={() => logoutFunc(navigate)}>
        Logout
      </p>
    </Navbar>
  );
}

export default Nav;
