import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { BsBackpack } from "react-icons/bs";
import { useSelector } from "react-redux";

function Navigation() {
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  return (
    <div className="nav-bar-all">
      <div className="navbar-navlink">
        <BsBackpack className='backpack-logo' onClick={() => navigate('/')} />
      </div>
      <div className="right-side-nav-bar">
        <NavLink className='navbar-navlink' to="/flashcards/all">Flashcards</NavLink>
        <NavLink className='navbar-navlink' to="/tests/all">Tests</NavLink>
        {/* <NavLink className='navbar-navlink plus-bit'>+</NavLink> */}
        <ProfileButton className='profile-button-nav' />
      </div>
    </div>
  );
}

export default Navigation;
