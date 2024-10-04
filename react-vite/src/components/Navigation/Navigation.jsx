import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/flashcards/all">Flashcards</NavLink>
      </li>
      <li>
        <NavLink to="/tests/all">Tests</NavLink>
      </li>
      <li>
        <NavLink to="/backpack">My backpack</NavLink>
      </li>
      <li>
        <NavLink to="/flashcards/new">New flashcard set</NavLink>
      </li>
      <li>
        <NavLink to="/tests/new">New practice test</NavLink>
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
