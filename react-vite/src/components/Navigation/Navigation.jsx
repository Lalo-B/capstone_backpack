import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { BsBackpack } from "react-icons/bs";

function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="nav-bar-all">
      <div>
        <BsBackpack className='backpack-logo' onClick={()=>navigate('/')}/>
      </div>
      <div className="right-side-nav-bar">
        <NavLink className='navbar-navlink' to="/flashcards/all">Flashcards</NavLink>
        <NavLink className='navbar-navlink' to="/tests/all">Tests</NavLink>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
