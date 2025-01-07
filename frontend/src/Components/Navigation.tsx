import { NavLink } from "react-router-dom";
import "./Navigation.module.css";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="new">Dodaj nowy park</NavLink>
        </li>
        <li>
          <NavLink to="">Ranking</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
