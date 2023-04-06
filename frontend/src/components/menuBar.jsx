import "./styles/menuBar.scss";
import { Link } from "react-router-dom";
import menuIcon from "./img/menu.png";

export function MenuBar() {
  return (
    <menu id="MenuBar">
      <a id="logo" href="/">
        Time Management Tool
      </a>
      <button id="menu-btn">
        <img id="icon" src={menuIcon} />
      </button>
      <nav id="menu">
        <ul>
          <li>
            <Link to="/calendar"> Calendar </Link>
            <Link to="/dailyRoutine">Daily Routine</Link>
            <Link to="/dailyRoutine">Daily Routine</Link>
          </li>
        </ul>
      </nav>
    </menu>
  );
}
