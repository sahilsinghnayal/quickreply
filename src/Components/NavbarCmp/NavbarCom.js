import Navbar from "react-bootstrap/Navbar";
import "./NavBarStyle.css";
function Nav() {
  return (
    <Navbar className="Navbarcss">
      
      <p className="navhead">Quick Reply Builder</p>

      <p className="LogoutBtn">Logout</p>
    </Navbar>
  );
}

export default Nav;
